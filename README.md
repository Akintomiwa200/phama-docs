# African Metabolome Database (AMDB)

The **African Metabolome Database (AMDB)** is a multi-domain metabolomics platform designed to capture the interconnected nature of ecosystems across Africa.

Rather than focusing exclusively on human metabolomics, the database integrates five biological domains to provide a biochemical map of interactions across plants, animals, humans, microbes, and environments.

---

## 1. Major Biological Domains

- **Plant Metabolomics:** Medicinal plants, agricultural crops, wild plant biodiversity, and phytochemical structural diversity.
- **Agricultural Metabolomics:** Crop stress responses (drought, salinity), plant-microbe rhizosphere interactions, soil metabolic signatures, crop quality & yield indicators.
- **Livestock Metabolomics:** Metabolic indicators of indigenous animal health, feed metabolite composition, growth & productivity biomarkers.
- **Environmental Metabolomics:** Soil metabolomes, aquatic ecosystems (lakes, rivers), and microbial environmental chemistry.
- **Human Metabolomics (Later Phases):** Disease biomarkers, nutritional metabolomics, microbiome-host metabolic interactions, precision health monitoring.

---

## 2. Core Data Types

1. **Primary Analytical Data:** Raw LC-MS/MS, GC-MS, and NMR spectroscopy parameters (m/z ratios, retention times, fragmentation patterns, signal intensities).
2. **Processed Feature Tables:** Aligned peak matrices across biological samples.
3. **Spectral Reference Data:** MS/MS fragmentation and NMR reference spectral libraries.
4. **Annotation Data:** Compound formulas, structures, database identifiers (MetaboLights, GNPS, PubChem), and probabilistic confidence scores.
5. **Biological Metadata:** Contextual metadata including species taxonomy, tissue type, geographic origin, environmental conditions, sample collection, and storage protocols.

---

## 3. Data Sources & DOI Publication Framework

- **Public Repositories:** MetaboLights, Metabolomics Workbench, GNPS.
- **Literature Curation:** Phytochemical analyses of African flora and crops.
- **Community Contributions & DOIs:** Data publication framework assigning persistent DOIs (e.g. `10.5281/zenodo.AMDB-...`), author attribution, and citation strings for contributed feature tables and spectral datasets.

---

## 4. Getting Started

Run the development server:

```bash
pnpm dev
```

Run build & lint checks:

```bash
pnpm run lint
pnpm run build
```
