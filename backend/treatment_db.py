"""
Comprehensive treatment & disease knowledge database.
Each key matches exactly one class label from config.py.

Fields
------
curable            : bool  — whether disease can be cured/controlled
severity           : str   — 'mild' | 'moderate' | 'severe' | None
pathogen           : str   — causative organism
details            : str   — clinical description shown in the results card
symptoms           : list  — observable signs
typical_affected_area : int  — % of body/leaf typically affected
feeding_safe       : bool | None  — True = safe to feed silkworms (leaf only)
isolation_required : bool  — isolate affected silkworms immediately
urgency            : str   — 'routine'|'low'|'moderate'|'immediate'|'critical'
chemical_treatment : list  — chemical / pharmaceutical interventions
biological_treatment: list — bio-control / organic interventions
cultural_practices : list  — rearing / farm management actions
prevention         : list  — proactive measures to prevent disease
"""

TREATMENT_DATABASE: dict = {

    # ══════════════════════════════════════════════════════════════════════════
    #  STAGE 1 — MULBERRY LEAF DISEASES
    # ══════════════════════════════════════════════════════════════════════════

    "Healthy Leaf": {
        "curable": True,
        "severity": None,
        "pathogen": None,
        "details": (
            "The mulberry leaf is in excellent health. Rich green coloration, "
            "proper texture, and no visible signs of disease, pest damage, or "
            "nutrient deficiency. Leaves are fully suitable for silkworm feeding."
        ),
        "symptoms": [],
        "typical_affected_area": 0,
        "feeding_safe": True,
        "isolation_required": False,
        "urgency": "routine",
        "chemical_treatment": [],
        "biological_treatment": [],
        "cultural_practices": [
            "Harvest leaves at optimal maturity (40–45 days old)",
            "Maintain regular irrigation schedule",
            "Apply balanced NPK fertiliser as per soil-test recommendations",
            "Continue current integrated pest management programme",
        ],
        "prevention": [
            "Conduct regular field scouting every 7–10 days",
            "Maintain proper canopy management and scheduled pruning",
            "Keep season-wise records of pest and disease incidence",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Leaf Rust": {
        "curable": True,
        "severity": "mild",
        "pathogen": "Cerotelium fici (obligate biotrophic fungus)",
        "details": (
            "Leaf Rust is caused by the fungal pathogen Cerotelium fici. "
            "Orange-yellow urediniospore pustules appear primarily on the underside "
            "of leaves. Infection reduces photosynthesis, causes premature leaf drop, "
            "and significantly decreases leaf quality for silkworm feeding. "
            "Mildly infected leaves may cause digestive issues in young silkworm "
            "instars (I–III) and must be withheld from feeding."
        ),
        "symptoms": [
            "Orange-yellow powdery pustules on leaf underside",
            "Corresponding pale-yellow spots on upper leaf surface",
            "Premature yellowing (chlorosis) and leaf abscission",
            "Circular to oval lesions 0.5–2 mm in diameter",
            "Reduced leaf nutritional value and dry-matter content",
        ],
        "typical_affected_area": 22,
        "feeding_safe": False,
        "isolation_required": False,
        "urgency": "moderate",
        "chemical_treatment": [
            "Dithane M-45 (Mancozeb 75 WP) @ 0.2% — spray at 10-day intervals",
            "Copper Oxychloride 50 WP @ 0.3% — protective spray before monsoon",
            "Propiconazole 25 EC @ 0.1% — systemic, for moderate-to-severe infection",
            "Hexaconazole 5 EC @ 0.05% — rapid systemic control",
        ],
        "biological_treatment": [
            "Trichoderma viride (1 × 10⁸ CFU/mL) @ 5 g/L — soil + foliar",
            "Pseudomonas fluorescens @ 5 g/L — spray every 14 days",
            "Neem oil (Azadirachtin 0.03%) @ 2–3 mL/L — inhibits spore germination",
            "Garlic extract @ 5% — broad-spectrum natural antifungal",
        ],
        "cultural_practices": [
            "Remove and destroy (burn) heavily infected leaves immediately",
            "Switch from overhead to drip or furrow irrigation",
            "Ensure proper plant spacing (≥1.8 m row × 0.9 m plant) for air circulation",
            "Prune overcrowded branches after harvest to reduce micro-humidity",
            "Collect and burn fallen infected leaves regularly",
            "Avoid field operations when foliage is wet",
        ],
        "prevention": [
            "Select rust-resistant mulberry varieties (V1, S-36, MR2)",
            "Apply preventive fungicide spray before monsoon onset",
            "Maintain proper field sanitation throughout the growing season",
            "Monitor rust pressure with weekly field scouting",
            "Withhold infected leaves from silkworm instars I–III under all circumstances",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Powdery Mildew": {
        "curable": True,
        "severity": "moderate",
        "pathogen": "Phyllactinia corylea (ascomycete fungus)",
        "details": (
            "Powdery Mildew is caused by the ascomycete Phyllactinia corylea. "
            "White powdery fungal mycelium colonises the leaf surface, disrupting "
            "photosynthesis and reducing leaf quality. Infected leaves fed to "
            "silkworms cause severe digestive disorders, reduced cocoon weight, "
            "and high larval mortality. Disease spreads rapidly at 25–30°C with "
            "low light and poor air circulation."
        ),
        "symptoms": [
            "White to grey powdery coating on upper leaf surface",
            "Leaf curling and downward distortion",
            "Chlorosis (yellowing) of infected tissue patches",
            "Stunted shoot and internode growth",
            "Premature senescence — leaves age and drop early",
            "Black cleistothecia (fruiting bodies) visible in late-season infection",
        ],
        "typical_affected_area": 45,
        "feeding_safe": False,
        "isolation_required": False,
        "urgency": "moderate",
        "chemical_treatment": [
            "Wettable Sulphur 80 WP @ 0.2% — most cost-effective treatment",
            "Karathane (Dinocap 25 EC) @ 0.05% — spray every 15 days",
            "Triadimefon 25 WP @ 0.05% — systemic, highly effective",
            "Tebuconazole 25 WEC @ 0.05% — for persistent / recurrent infection",
        ],
        "biological_treatment": [
            "Potassium bicarbonate @ 0.5% — disrupts fungal cell membrane pH",
            "Neem oil (cold-pressed) @ 1–2% with emulsifier — broad-spectrum",
            "Bacillus subtilis (1 × 10⁸ CFU/mL) — foliar spray every 10 days",
            "10% milk-water spray — raises leaf-surface pH hostile to fungus",
        ],
        "cultural_practices": [
            "Prune and burn heavily infected shoots immediately",
            "Increase inter-plant spacing to improve air and light penetration",
            "Avoid excess nitrogen (ammoniacal) fertilisation — promotes succulent growth",
            "Remove infected debris from field floor",
            "Delay leaf harvest until powdery coating fully clears (minimum 15 days post-treatment)",
        ],
        "prevention": [
            "Plant resistant mulberry varieties (S-1635, Victory-1)",
            "Avoid waterlogged conditions — improve field drainage",
            "Apply preventive sulphur dust during cool, humid months",
            "Rotate fungicide chemical classes to prevent resistance build-up",
            "NEVER feed powdery-mildew-infected leaves to silkworms",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Leaf Spot": {
        "curable": True,
        "severity": "mild",
        "pathogen": "Cercospora moricola (deuteromycete fungus)",
        "details": (
            "Leaf Spot disease caused by Cercospora moricola creates characteristic "
            "circular to irregular brown lesions with darker margins on mulberry "
            "leaves. While generally less severe than rust or powdery mildew, "
            "heavy infections cause significant defoliation and reduce available "
            "leaf for silkworm rearing. Mildly spotted leaves may be fed to older "
            "silkworm instars (IV–V) only, with careful monitoring."
        ),
        "symptoms": [
            "Circular to irregular brown spots (3–10 mm diameter)",
            "Dark reddish-brown spot margins with pale grey-white centres",
            "Yellow halo surrounding individual lesions",
            "Premature leaf drop in severe infections",
            "Tiny black pycnidia (fruiting bodies) visible within lesions",
        ],
        "typical_affected_area": 30,
        "feeding_safe": False,
        "isolation_required": False,
        "urgency": "low",
        "chemical_treatment": [
            "Carbendazim 50 WP @ 0.1% — effective systemic control",
            "Copper Oxychloride 50 WP @ 0.3% — protective, apply before rains",
            "Chlorothalonil 75 WP @ 0.2% — broad-spectrum protective fungicide",
            "Thiophanate-methyl 70 WP @ 0.15% — systemic, for moderate infections",
        ],
        "biological_treatment": [
            "Pseudomonas fluorescens @ 5 g/L — natural biological suppression",
            "Bacillus subtilis + Trichoderma consortium @ 5 g/L each",
            "Neem cake soil application @ 200 kg/acre — reduces soilborne inoculum",
        ],
        "cultural_practices": [
            "Collect and burn infected fallen leaves immediately",
            "Avoid sprinkler irrigation — switch to drip or furrow irrigation",
            "Apply mulch around plant base to prevent rain-splash dispersal",
            "Thin crowded canopy to improve air and light penetration",
            "Delay leaf harvest by 2 weeks in heavily infected plots",
        ],
        "prevention": [
            "Apply copper-based protective spray at crop re-flush after pruning",
            "Avoid wounding plants during cultural operations",
            "Rotate mulberry garden with cover crops if infection is recurrent",
            "Use disease-free planting material for new garden establishment",
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    #  STAGE 2 — SILKWORM DISEASES
    # ══════════════════════════════════════════════════════════════════════════

    "Healthy Silkworm": {
        "curable": True,
        "severity": None,
        "pathogen": None,
        "details": (
            "The silkworm appears in excellent health. Normal body coloration, "
            "active crawling behaviour, vigorous feeding activity, and proper body "
            "turgidity are observed. No signs of disease, physical abnormality, or "
            "stress are present. Continue standard rearing practices."
        ),
        "symptoms": [],
        "typical_affected_area": 0,
        "feeding_safe": None,
        "isolation_required": False,
        "urgency": "routine",
        "chemical_treatment": [],
        "biological_treatment": [],
        "cultural_practices": [
            "Maintain rearing-room temperature at 24–28 °C",
            "Keep relative humidity between 70–85%",
            "Provide fresh mulberry leaves 3–4 times daily",
            "Clean rearing trays every alternate day",
            "Apply lime powder on tray bottom to absorb moisture",
        ],
        "prevention": [
            "Disinfect rearing room before each batch with 2% formalin",
            "Use certified disease-free layings from authorised grainage only",
            "Wash hands thoroughly before handling silkworms",
            "Quarantine new lots before introducing to main rearing area",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Muscardine": {
        "curable": True,
        "severity": "moderate",
        "pathogen": "Beauveria bassiana / Isaria farinosa (entomopathogenic fungi)",
        "details": (
            "White Muscardine is a highly contagious fungal disease caused by "
            "Beauveria bassiana. The fungus infects silkworms through cuticular "
            "penetration, killing the larva within 3–5 days. Dead larvae become "
            "mummified and covered in white powdery conidia — the primary source "
            "of secondary infection. One infected larva can contaminate an entire "
            "tray within 12 hours. Temperature above 30 °C and humidity above 85% "
            "dramatically accelerate spread."
        ),
        "symptoms": [
            "White chalky-powdery coating covering the entire body surface",
            "Rigid, mummified body post-death",
            "Reduced crawling speed and feeding activity",
            "Soft, translucent body appearance before death",
            "Sporadic, progressively spreading death pattern in tray",
        ],
        "typical_affected_area": 38,
        "feeding_safe": None,
        "isolation_required": True,
        "urgency": "immediate",
        "chemical_treatment": [
            "2% Formalin solution — spray all rearing trays, tools, and room surfaces",
            "Lime powder (calcium hydroxide) — dust tray floor; absorbs moisture and inhibits fungal growth",
            "0.5% Bleaching powder solution — disinfect rearing racks and surfaces",
            "Slaked lime (1 kg per 10 sq ft) — spread on rearing-room floor to lower ambient humidity",
        ],
        "biological_treatment": [
            "Ensure vigorous ventilation — Muscardine cannot spread in dry, well-ventilated rooms",
            "Trichoderma harzianum powder — environmental bio-control on rearing-room floor",
        ],
        "cultural_practices": [
            "IMMEDIATELY isolate infected silkworms — transfer to separate sealed container",
            "Incinerate or deeply bury all dead silkworms — NEVER compost",
            "Dust entire rearing surface with lime powder after removing infected larvae",
            "Reduce humidity to below 75% using forced ventilation or dehumidifier",
            "Avoid overcrowding trays — maintain proper stocking density",
            "Sterilise all rearing tools in 2% formalin for a minimum of 30 minutes",
            "Replace contaminated mountages, nets, and rearing paper",
        ],
        "prevention": [
            "Disinfect rearing room with 2% formalin + 2% bleach solution 5 days before new batch",
            "Store mulberry leaves in cool, dry conditions before feeding",
            "Maintain temperature 24–26 °C and humidity 70–75%",
            "Wipe excess moisture from leaves before feeding — never feed wet leaves",
            "Apply lime powder as routine biosecurity measure twice per week",
            "Source disease-free eggs exclusively from certified grainage",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Flacherie": {
        "curable": False,
        "severity": "severe",
        "pathogen": (
            "Nuclear Polyhedrosis Virus (NPV) / Infectious Flacherie Virus (IFV) "
            "+ secondary bacterial infection (Serratia marcescens, Bacillus cereus)"
        ),
        "details": (
            "Flacherie is one of the most economically damaging silkworm diseases. "
            "Viral Flacherie (NPV / IFV) is incurable — all affected larvae must "
            "be destroyed. Bacterial Flacherie can be partially managed if detected "
            "early. Disease causes softening and putrefaction of the silkworm body, "
            "emitting a characteristic foul odour. Transmission occurs through "
            "contaminated faeces, feeding utensils, and mulberry leaves grown in "
            "contaminated soil. Immediate containment is critical."
        ),
        "symptoms": [
            "Soft, flaccid body — loses normal turgor pressure",
            "Dark brown to black anterior-segment coloration",
            "Foul, putrid smell from affected larvae",
            "Watery diarrhoea — faeces become liquid and yellow-brown",
            "Loss of appetite 24–48 hours before death",
            "Silk-gland degeneration visible through translucent body wall",
        ],
        "typical_affected_area": 65,
        "feeding_safe": None,
        "isolation_required": True,
        "urgency": "immediate",
        "chemical_treatment": [
            "1% Sodium hypochlorite (bleach) — spray all rearing equipment and surfaces",
            "Labim or Vijetha viral disinfectant — apply to healthy lots as prophylaxis",
            "2% Formalin — full disinfection of rearing room, trays, and all tools",
            "0.3% Chlorine dioxide solution — effective against viral and bacterial pathogens",
        ],
        "biological_treatment": [
            "No biological cure exists for viral Flacherie",
            "Probiotic Bacillus supplements may reduce bacterial load in remaining healthy lots",
        ],
        "cultural_practices": [
            "IMMEDIATELY remove and incinerate ALL infected larvae — no exceptions",
            "Disinfect entire rearing area with 1% bleach followed by 2% formalin",
            "Do NOT use mulberry leaves grown in soil fertilised with feces from diseased batches",
            "Wash hands with soap before and after handling any silkworm material",
            "Destroy all contaminated leaf remains and silkworm excreta",
            "Quarantine healthy lots from same rearing room — monitor every 6 hours",
        ],
        "prevention": [
            "Use only certified virus-free F1 hybrid eggs from government grainage",
            "Strict disinfection protocol: 2% formalin spray 5 days before each new batch",
            "Avoid feeding poor-quality, wilted, or field-contaminated leaves",
            "Do not fertilise mulberry gardens with excreta from diseased batches",
            "Maintain strict rearing hygiene — clean trays every 24 hours",
            "Report confirmed outbreak to local Sericulture Department immediately",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Grasserie": {
        "curable": False,
        "severity": "severe",
        "pathogen": "Bombyx mori Nuclear Polyhedrosis Virus — BmNPV (Baculoviridae)",
        "details": (
            "Grasserie (Nuclear Polyhedrosis) is caused by BmNPV, a species-specific "
            "baculovirus that infects the silk glands, fat body, and haemocytes. "
            "The virus replicates inside host-cell nuclei, forming polyhedral inclusion "
            "bodies (PIBs). Infected larvae appear bloated and shiny due to haemolymph "
            "accumulation under the cuticle. A single infected larva's haemolymph "
            "contains billions of virus particles. There is NO chemical treatment that "
            "can cure infected silkworms — entire batches must be destroyed."
        ),
        "symptoms": [
            "Shiny, translucent body surface — waxy or glazed appearance",
            "Swollen, bloated body especially in posterior segments",
            "Yellowish haemolymph visible through cuticle under light",
            "Sluggish movement — larva hangs limply from tray edge",
            "Cuticle ruptures easily, releasing milky-yellow haemolymph",
            "Death followed by rapid liquefaction of internal organs",
        ],
        "typical_affected_area": 70,
        "feeding_safe": None,
        "isolation_required": True,
        "urgency": "immediate",
        "chemical_treatment": [
            "0.5% Bleaching powder — immediately disinfect all surfaces and tools",
            "2% Formalin + 0.3% slaked lime mixture — thorough environmental disinfection",
            "UV light (254 nm, 30 min) — inactivates BmNPV on equipment surfaces",
            "Potassium permanganate (1 : 1 000) — rearing-room fumigation",
        ],
        "biological_treatment": [
            "No cure exists — all efforts must focus on biosecurity and containment",
            "Entire infected batch must be destroyed before any biological intervention",
        ],
        "cultural_practices": [
            "IMMEDIATELY isolate and incinerate ALL larvae from infected tray",
            "Do NOT touch infected larvae with bare hands — virus transmits by contact",
            "Disinfect rearing trays with 0.5% bleach, then 2% formalin (30 min each)",
            "Dispose of or sterilise ALL equipment from the affected area",
            "Scrub rearing-room walls and floor with bleach solution (0.5%)",
            "Block movement of personnel and equipment between infected and healthy areas",
        ],
        "prevention": [
            "Source eggs exclusively from government-certified disease-free grainage",
            "Complete room disinfection (2% formalin + fumigation) between every batch",
            "Avoid feeding BmNPV-contaminated mulberry leaves",
            "UV light sanitise rearing room 30 min/day during active rearing",
            "Conduct larval health checks every 12 hours during instars III–V",
            "Record and report any outbreak to State Sericulture Board immediately",
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────

    "Pebrine": {
        "curable": False,
        "severity": "severe",
        "pathogen": "Nosema bombycis (microsporidian intracellular obligate parasite)",
        "details": (
            "Pebrine is the most feared silkworm disease. Caused by the microsporidian "
            "Nosema bombycis, it is the ONLY silkworm disease transmitted transovarially "
            "(from mother moth to eggs), making it nearly impossible to eradicate once "
            "present in a rearing unit. Infected silkworms show characteristic "
            "pepper-like black spots. There is NO treatment — entire infected batches "
            "must be destroyed and the incident reported to authorities. Prevention "
            "through certified Disease-Free Layings (DFL) is the ONLY strategy."
        ),
        "symptoms": [
            "Black or dark-brown pepper-like spots scattered over body surface",
            "Stunted, retarded growth — larvae fail to moult normally",
            "Irregular feeding — some larvae stop eating entirely",
            "Dull, discoloured body surface",
            "Spinning failure — larvae fail to spin or spin flimsy cocoons",
            "Unusually high larval and pupal mortality",
        ],
        "typical_affected_area": 80,
        "feeding_safe": None,
        "isolation_required": True,
        "urgency": "critical",
        "chemical_treatment": [
            "⛔ NO chemical treatment can cure Pebrine — DO NOT attempt",
            "All infected material must be destroyed — disinfect equipment with 5% formalin post-destruction",
        ],
        "biological_treatment": [
            "No biological control available",
            "Strict biosecurity and batch destruction are the ONLY responses",
        ],
        "cultural_practices": [
            "IMMEDIATELY report suspected Pebrine to State Sericulture Authority",
            "Completely incinerate ALL larvae, pupae, moths, cocoons, and leaf refuse",
            "Destroy or sterilise all rearing equipment from the affected room",
            "Disinfect rearing room with 5% formalin — seal and leave for 24 hours minimum",
            "Do NOT allow any material from the infected area to leave the premises",
            "Conduct mother-moth microscopic examination for ALL future batches",
        ],
        "prevention": [
            "USE ONLY certified Disease-Free Layings (DFL) from government grainage — zero exceptions",
            "Perform compulsory mother-moth microscopic examination before using any eggs",
            "Conduct acid-treatment test (1% HCl) on crushed mother-moth tissue samples",
            "Never purchase eggs from unregistered or uncertified sources",
            "Apply strict quarantine to all incoming silkworm material",
            "Any suspected batch must be destroyed immediately — zero-tolerance policy",
            "Reporting Pebrine is a legal requirement in most Indian states",
        ],
    },
}
