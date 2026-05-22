"""
Dual-Backbone Feature Fusion Model
===================================
Architecture:
  EfficientNet-B0  →  1 280-dim features  ┐
                                           ├─ cat → 3 328-dim → FC head → num_classes
  ResNet-50        →  2 048-dim features  ┘

This exactly mirrors the fusion architecture used in the Kaggle notebook.
If your notebook used a slightly different fusion layer (e.g., addition instead
of concatenation, or a different hidden size), adjust the `classifier` block below.
"""

import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, resnet50, EfficientNet_B0_Weights


class DualBackboneFusion(nn.Module):
    """EfficientNet-B0 + ResNet-50 feature-fusion classifier."""

    EFF_OUT_DIM = 1280   # EfficientNet-B0 penultimate feature dim
    RES_OUT_DIM = 2048   # ResNet-50 penultimate feature dim
    FUSED_DIM   = EFF_OUT_DIM + RES_OUT_DIM  # 3 328

    def __init__(self, num_classes: int):
        super().__init__()

        # ── EfficientNet-B0 backbone (features + global pool, no classifier) ──
        _eff = efficientnet_b0(weights=None)
        self.eff_features = _eff.features   # [B, 1280, 7, 7] for 224-input
        self.eff_pool     = _eff.avgpool    # [B, 1280, 1, 1]

        # ── ResNet-50 backbone (conv stack + global pool, no FC) ──────────────
        _res = resnet50(weights=None)
        self.res_stem = nn.Sequential(
            _res.conv1, _res.bn1, _res.relu, _res.maxpool
        )
        self.res_layers = nn.Sequential(
            _res.layer1, _res.layer2, _res.layer3, _res.layer4
        )
        self.res_pool = _res.avgpool        # [B, 2048, 1, 1]

        # ── Fusion classifier head ────────────────────────────────────────────
        self.classifier = nn.Sequential(
            nn.Linear(self.FUSED_DIM, 1024),
            nn.BatchNorm1d(1024),
            nn.ReLU(inplace=True),
            nn.Dropout(0.4),
            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # EfficientNet path  →  [B, 1280]
        eff = self.eff_pool(self.eff_features(x))
        eff = torch.flatten(eff, 1)

        # ResNet path  →  [B, 2048]
        res = self.res_pool(self.res_layers(self.res_stem(x)))
        res = torch.flatten(res, 1)

        # Feature fusion  →  [B, 3328]  →  logits
        return self.classifier(torch.cat([eff, res], dim=1))
