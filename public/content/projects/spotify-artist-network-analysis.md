# Spotify Artist Network Analysis

A large-scale network analysis of **~156,000 Spotify artists** and their connections, combining distributed data processing with **Apache Spark (PySpark)** and graph analytics with **NetworkX**.

## Overview

This project explores the structure of the Spotify artist collaboration/similarity network to answer questions like:

- **Who are the most influential artists** in the network? (centrality analysis)
- **Can network position predict popularity?** (linear regression)
- **Are there natural artist segments** based on network features? (K-Means clustering)
- **Does the network follow a power-law distribution?** (degree distribution analysis)

## Results

### Network at a Glance

| Metric | Value |
|---|---|
| Total artists (nodes) | 156,417 |
| Total connections (edges) | ~300K |
| Sampled subgraph | ~20,000 nodes |
| Connected components (sampled) | 15,778 |
| Diameter (largest component) | 23 |
| Mean degree | 3.85 |

### Top Artists by Centrality

| Rank | Degree Centrality | Betweenness | Eigenvector | PageRank |
|---|---|---|---|---|
| 1 | Jean Sibelius | Gucci Mane | Gucci Mane | Jean Sibelius |
| 2 | Gucci Mane | Lil Wayne | 2 Chainz | Gucci Mane |
| 3 | Lil Wayne | Dimitri Vegas & Like Mike | Lil Wayne | Ennio Morricone |
| 4 | Ty Dolla $ign | De La Ghetto | Ty Dolla $ign | Alkpote |
| 5 | Wyclef Jean | Dubdogz | Rick Ross | Mc Cyclope |

Different centrality measures highlight different types of influence. Gucci Mane ranks highly across all metrics, while classical composers like Jean Sibelius appear as hubs connecting many niche subgenres.

### Degree Distribution

The network follows a power-law degree distribution, typical of scale-free networks. Most artists have very few connections while a small number of "hub" artists are heavily connected.

![Degree Distribution](https://raw.githubusercontent.com/SiegKat/spotify-artist-network-analysis/main/figures/degree_distribution.png)

### Subgraph of Top 100 Artists

![Top 100 Artists Subgraph](https://raw.githubusercontent.com/SiegKat/spotify-artist-network-analysis/main/figures/top100_subgraph.png)

### Popularity Prediction (Linear Regression)

Using followers + all five centrality features to predict Spotify's `popularity` score:

| Metric | Value |
|---|---|
| RMSE | 16.56 |
| R² | 0.153 |

R² of ~0.15 means network position alone explains about 15% of the variance in popularity. The remaining 85% comes from external factors like marketing, playlist placement, and release timing.

### K-Means Clustering

The elbow method suggested **k=3** as the optimal number of clusters:

![Elbow Method](https://raw.githubusercontent.com/SiegKat/spotify-artist-network-analysis/main/figures/elbow_method.png)

| Cluster | Avg Followers | Description |
|---|---|---|
| 0 | ~32K | **Niche artists** - low connectivity, long tail of the network |
| 1 | ~224K | **Mid-tier artists** - moderate connections and centrality |
| 2 | ~7.8M | **Hub artists** - highly connected superstars with high eigenvector centrality |

### Full vs. Sampled Graph Comparison

Uniform random sampling preserves the degree distribution of the full graph. Both distributions overlap on the log-log plot, validating the sampling approach.

![Degree Distribution Comparison](https://raw.githubusercontent.com/SiegKat/spotify-artist-network-analysis/main/figures/degree_comparison_loglog.png)

## Project Structure

```
spotify-artist-network-analysis/
├── README.md
├── LICENSE
├── requirements.txt
├── .gitignore
├── spotify_artist_network_analysis.ipynb
├── figures/
│   ├── top100_subgraph.png
│   ├── degree_distribution.png
│   ├── elbow_method.png
│   └── degree_comparison_loglog.png
└── data/
    └── README.md
```

## Tech Stack

- **PySpark** - Distributed data loading, feature engineering, ML (Linear Regression, K-Means)
- **NetworkX** - Graph construction, centrality metrics (degree, betweenness, closeness, eigenvector, PageRank)
- **Matplotlib** - Visualizations (subgraph plots, degree distributions, elbow method)
- **Pandas / NumPy** - Data manipulation and numerical computing

## Getting Started

### Prerequisites

- Python 3.10+
- Apache Spark (local mode is sufficient)
- Conda or pip for dependency management

### Installation

```bash
git clone https://github.com/SiegKat/spotify-artist-network-analysis.git
cd spotify-artist-network-analysis

pip install -r requirements.txt
```

### Data Setup

See [data/README.md](https://github.com/SiegKat/spotify-artist-network-analysis/blob/main/data/README.md) for instructions on obtaining the Spotify artist network dataset.

### Running

```bash
jupyter notebook spotify_artist_network_analysis.ipynb
```

Run all cells in order. Figures are saved to `figures/` automatically.

## License

This project is licensed under the MIT License. See [LICENSE](https://github.com/SiegKat/spotify-artist-network-analysis/blob/main/LICENSE) for details.
