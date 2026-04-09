# Odoo Landing Page — Mockup Integration

Intégration statique d'une landing page en HTML/SCSS avec Bootstrap 5.3, réalisée dans le cadre d'un exercice technique pour Odoo.

## 🎯 Objectif

Démontrer la maîtrise de :
- Bootstrap 5 (grid, composants, variables SCSS)
- Système de design tokens structuré
- Méthodologie BEM
- Intégration pixel-perfect responsive

## 🛠️ Stack technique

- **HTML5** sémantique
- **SCSS** avec architecture modulaire
- **Bootstrap 5.3** (framework CSS)
- **Bootstrap Icons** (icon font)
- **Vite** (build tool)

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/ton-username/odoo-mockup-integration.git

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev
```

## 🏗️ Structure du projet

```
odoo-mockup-integration/
├── assets/
│   └── images/              # Logos et visuels
├── js/
│   └── main.js              # Scripts custom
├── scss/
│   ├── main.scss            # Point d’entrée (ordre des imports)
│   ├── foundation/
│   │   ├── _tokens.scss         # Design tokens (couleurs, typo, spacing, angles, etc.)
│   │   ├── _mixins.scss         # Breakpoints, sections diagonales, séparateurs, liens, boutons
│   │   ├── _variables.scss      # Overrides Bootstrap (couleurs thème, typo titres…)
│   │   ├── _custom-properties.scss
│   │   └── _bootstrap-stack.scss
│   ├── elements/             # Badges, boutons…
│   └── sections/            # Header, Hero, Arguments, Tools, Features…
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Système de design

Le projet utilise un système de **design tokens** structuré :

- **Couleurs** : brand / accents **sans suffixe d’échelle** (`$color-brand-primary`, `$color-accent-green`, `$color-accent-yellow`), neutres 50–900, surfaces, texte, bordures
- **Typographie** : familles, poids, tailles, interlignes
- **Espacements** : échelle cohérente (`$space-*`)
- **Ombres** : xs à 2xl + variantes couleur
- **Bordures** : épaisseurs + radius
- **Animations** : durées, easings, transitions
- **Sections** : `$section-diagonal-angle` (coupe inclinée hero / awards / footer)
- **Séparateurs** : `$separator-fade-white-peak` (opacité du pic blanc au centre des traits en dégradé)

Les tokens alimentent les **overrides Bootstrap** pour garder la cohérence entre composants Bootstrap et sections custom.

### Mixins SCSS réutilisables (`foundation/_mixins.scss`)

- **Breakpoints** : `bp-min`, `bp-max`, `bp-down`, `bp-up`
- **Coupe diagonale** (`clip-path`, même angle que le mockup) :  
  `section-diagonal-bottom` + `section-diagonal-padding-bottom` (Hero, Awards) ;  
  `section-diagonal-top` + `section-diagonal-padding-top` (Footer, bord haut)
- **Séparateurs horizontaux** (transparent → blanc léger → transparent) :  
  `el-separator-fade-x-bottom`, `el-separator-fade-x-top` (ex. Footer ; trait sous la navbar dans le Header)
- **Liens soulignés type maquette** (barre 3px) : `el-link-underline-bar` (couleur + couleur hover, léger gain de `padding-inline` au survol)
- **Boutons / badges** : `el-button-*`, `el-badge-*`

## 📱 Sections intégrées

1. **Header** — Navbar responsive avec collapse mobile ; ligne de séparation en dégradé horizontal sous la barre
2. **Hero** — Fond brand, bord bas incliné (mixins), CTA + logos partenaires + carte mockup
3. **Arguments, Tools, Features, Technology, Install** — Sections en grille / alternance de contenu
4. **Infinite Solutions** — Bloc CTA sur fond sombre (capsule arrondie)
5. **Awards** — Fond `$color-surface-awards`, **bord bas incliné** comme le Hero, carrousel horizontal avec cartes
6. **FAQ** — Accordion sur 2 colonnes (Grid CSS)
7. **Footer** — Fond sombre, **bord haut incliné** (continuité visuelle avec la section au-dessus), séparateurs internes en dégradé

## 🚀 Build production

```bash
npm run build
```

Le build génère les fichiers optimisés dans `/dist`.

## 🌐 Demo live

👉 [Voir la démo](https://kevinsovet.github.io/odoo-mockup-integration/)

## 📝 Notes techniques

### Bootstrap modulaire

Le projet importe **tout Bootstrap** pour assurer la flexibilité future, mais exploite les **variables SCSS** pour override en amont et éviter les conflits CSS.

### Méthodologie BEM

Tous les composants custom suivent la convention BEM :

- `.awards__card--offset`
- `.faq__cta-buttons`
- `.accordion-button__content`

### Accordion FAQ

Utilise un **seul accordion Bootstrap** avec layout 2 colonnes via **CSS Grid**. Les icônes +/- sont gérées via `::before` avec désactivation de l'icône Bootstrap par défaut.

### Coupes inclinées et `overflow`

Le **Hero** applique `overflow: hidden` avec la coupe basse. La section **Awards** conserve `overflow-x: hidden` (desktop) / `auto` (mobile) pour le scroll du carrousel, sans imposer `overflow: hidden` dans le mixin de diagonale.

## 📄 Licence

MIT

## 👤 Auteur

**Kevin Sovet**  
Web Designer & Front-End Integrator  
[by-sovet.me](https://by-sovet.me)
