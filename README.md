# Odoo Landing Page — Mockup Integration

Intégration statique d'une landing page en HTML/SCSS avec Bootstrap 5.3, réalisée dans le cadre d'un exercice technique pour Odoo.

## Objectif

Démontrer la maîtrise de :

- Bootstrap 5 (grid, composants, variables SCSS)
- Système de design tokens structuré
- Méthodologie BEM
- Intégration responsive alignée sur la maquette

## Stack technique

| Domaine | Choix |
|--------|--------|
| Balisage | HTML5 sémantique |
| Styles | SCSS modulaire (`foundation/` + `sections/`) |
| Framework CSS | Bootstrap 5.3 |
| Icônes | Bootstrap Icons |
| Build | Vite |

## Installation

```bash
git clone https://github.com/ton-username/odoo-mockup-integration.git
cd odoo-mockup-integration
npm install
npm run dev
```

- **`npm run build`** — bundle de production dans `/dist`
- **`npm run preview`** — prévisualiser le build localement

## Structure du projet

```
odoo-mockup-integration/
├── assets/
│   ├── images/                 # Logos, photos, illustrations utilisés dans la page
│   └── mockup/                 # Documentation visuelle du découpage (voir ci-dessous)
├── js/
│   └── main.js                 # Header (scroll, hauteur CSS), boutons vidéo (placeholder)
├── scss/
│   ├── main.scss               # Point d’entrée (ordre des imports)
│   ├── foundation/
│   │   ├── _tokens.scss        # Design tokens
│   │   ├── _mixins.scss        # Breakpoints, coupes diagonales, séparateurs, liens, vidéo…
│   │   ├── _variables.scss     # Overrides Bootstrap (`!default`)
│   │   ├── _custom-properties.scss
│   │   ├── _bootstrap-stack.scss
│   │   └── _components.scss    # Surcharges globales .btn, .badge, .card
│   └── sections/               # Une feuille par zone de page
│       ├── _header.scss
│       ├── _hero.scss
│       ├── argument/           # Sections « arguments » (Tools, Features, Technology, Install)
│       ├── _infinite-solutions.scss
│       ├── _awards.scss
│       ├── _faq.scss
│       └── _footer.scss
├── index.html
├── package.json
└── vite.config.js
```

## Documentation visuelle — découpage HTML (`assets/mockup`)

Pour documenter **comment la page est structurée et découpée en blocs** avant / pendant l’intégration, des exports ont été ajoutés sous `assets/mockup/` :

- **`structure_visuelle_blocs.pdf`** (également présent dans `mockup/découpage_blocs/`) — vue d’ensemble de la structure en blocs.
- **`découpage_blocs/`** — schémas **PNG par section** (versions *complets* et *simplifiés*) : header, hero, outils, features, technology, install, infinite solutions, awards, FAQ, footer. Chaque fichier illustre la division logique du contenu et l’imbrication des blocs correspondant au HTML.
- **`découpage_zones/`** — vues par **grandes zones** / écran pour situer chaque partie de la landing dans la page.

Ces livrables servent de **pont entre la maquette et le code** : ils montrent explicitement la granularité des sections et des sous-blocs retenus pour le balisage.

## Système de design

Le projet s’appuie sur des **design tokens** (`foundation/_tokens.scss`) :

- Couleurs (brand, accents, neutres, surfaces, texte, bordures)
- Typographie (familles, poids, échelle de tailles, interlignes)
- Espacements (`$space-*`), ombres, rayons, durées et easings
- Sections : `$section-diagonal-angle` (coupes inclinées), `$separator-fade-white-peak` (séparateurs en dégradé)

Les tokens alimentent les **overrides Bootstrap** (`foundation/_variables.scss`) pour limiter les surcharges CSS ponctuelles.

### Mixins utiles (`foundation/_mixins.scss`)

- **Breakpoints** : `bp-down`, `bp-up`, fonctions `bp-min` / `bp-max`
- **Coupes diagonales** : `section-diagonal-bottom`, `section-diagonal-bottom-mirror-v`, `section-diagonal-top`, et mixins de padding associés
- **Séparateurs** : `el-separator-fade-x-bottom`, `el-separator-fade-x-top`
- **Liens** : `link-underline` (barre sous le texte, couleur de survol optionnelle)
- **Vidéo (maquette)** : `el-video-preview-frame`, `el-video-preview-thumbnail`, `el-video-preview-btn`
- **Boutons / badges** (utilisés dans `foundation/_components.scss`) : `el-button-layout`, `el-button-solid`, `el-badge-shell`, `el-badge-tone`

## Sections intégrées

1. **Header** — Navbar responsive, collapse mobile, trait sous la barre en dégradé
2. **Hero** — Fond brand, bord bas incliné, CTA, partenaires, carte mockup
3. **Arguments** (Tools, Features, Technology, Install) — grilles et alternance texte / média
4. **Infinite Solutions** — bloc CTA sur fond sombre
5. **Awards** — fond `$color-surface-awards`, bord bas incliné, carrousel horizontal (mobile)
6. **FAQ** — accordéon sur deux colonnes (grid), icônes custom (`::before`)
7. **Footer** — fond sombre, bord haut incliné, séparateurs internes en dégradé

## Build & déploiement

```bash
npm run build
```

Le dossier `dist/` contient les assets prêts à être servis.

**`base` Vite** (`vite.config.js`) :

- **`npm run dev`** — `base` = `/` : chemins comme en racine du site (pratique en local).
- **`npm run build`** — `base` = `/odoo-mockup-integration/` : chemins compatibles avec GitHub Pages pour ce dépôt.

Pour un autre hébergement ou un fork, ajuster le sous-chemin dans `vite.config.js` ou utiliser une variable d’environnement si besoin.

**Démo :** [kevinsovet.github.io/odoo-mockup-integration/](https://kevinsovet.github.io/odoo-mockup-integration/)

## Notes techniques

### Bootstrap

- **CSS** : import complet du stack SCSS Bootstrap (`foundation/_bootstrap-stack`) pour piloter les variables ; composants utilisés selon la maquette (navbar, grid, boutons, cartes, accordéon, progression, etc.).
- **JS** : `bootstrap.bundle.min.js` est importé depuis **`npm`** dans `js/main.js` (même version que le package), pas de CDN — évite les divergences de version avec le SCSS.

### BEM

Exemples de blocs custom : `.awards__card--rating`, `.faq__cta-buttons`, `.accordion-button__content`.

### FAQ — accordéon

Layout deux colonnes en CSS Grid ; chevrons Bootstrap désactivés via variables SCSS, remplacés par des icônes Bootstrap Icons en `::before` sur le bouton.

### Coupes inclinées et `overflow`

Le Hero utilise `overflow: hidden` avec la diagonale. La section Awards gère le scroll horizontal du carrousel avec des conteneurs dédiés pour limiter le rognage des ombres au survol.

## Licence

MIT

## Auteur

**Kevin Sovet**  
Web Designer & Front-End Integrator  
[by-sovet.me](https://by-sovet.me)
