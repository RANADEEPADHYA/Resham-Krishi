"""
Kaggle Notebook Ensemble Architecture
=====================================
Matches the actual model trained in your Kaggle notebook:
- m1: timm EfficientNet-B0
- m2: torchvision ResNet-50
- Combined ensemble: (m1(x) + m2(x)) / 2
"""

import torch
import torch.nn as nn
import torchvision.models as models
import timm


class EnsembleModel(nn.Module):
    """Ensemble model matching the Kaggle training code."""

    def __init__(self, num_classes: int):
        super().__init__()
        # m1: EfficientNet-B0
        self.m1 = timm.create_model('efficientnet_b0', pretrained=False)
        in_features_m1 = self.m1.classifier.in_features
        self.m1.classifier = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(in_features_m1, num_classes)
        )

        # m2: ResNet-50
        self.m2 = models.resnet50(pretrained=False)
        in_features_m2 = self.m2.fc.in_features
        self.m2.fc = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(in_features_m2, num_classes)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return (self.m1(x) + self.m2(x)) / 2.0
