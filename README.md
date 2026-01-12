# React Material 3 Pure

A production-ready, pixel-perfect implementation of Google's **Material Design 3 (M3)** component library for React — built from scratch with zero external UI dependencies.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-10-ff4785.svg)](https://storybook.js.org/)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)]()

## ✨ Features

- 🎨 **Pixel-perfect M3 implementation** — Follows the official [Material Design 3 specification](https://m3.material.io/)
- 🚫 **Zero dependencies** — Pure React + CSS Modules, no external UI libraries
- 🎭 **State Layer system** — Authentic M3 interaction states (not simple color changes)
- 💧 **Ripple effects** — Hardware-accelerated ink ripples from click coordinates
- ♿ **Accessible** — Full ARIA support, keyboard navigation, screen reader friendly
- 🎯 **Type-safe** — Complete TypeScript definitions with JSDoc documentation
- 🧪 **100% tested** — Comprehensive test coverage with Storybook + Vitest
- 🎨 **Themeable** — CSS custom properties for easy customization

## 📦 Installation

```bash
npm install react-material-3-pure
```

## 🚀 Quick Start

```tsx
import { Button } from 'react-material-3-pure';
import 'react-material-3-pure/styles/theme.css';

function App() {
  return (
    <div>
      <Button variant="filled" onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </div>
  );
}
```

## 🎛️ Components

### Button

A production-ready Material Design 3 button with 5 visual variants.

```tsx
import { Button } from 'react-material-3-pure';

// Variants
<Button variant="filled">Filled</Button>     // High emphasis (default)
<Button variant="tonal">Tonal</Button>       // Medium emphasis
<Button variant="elevated">Elevated</Button> // Medium emphasis with shadow
<Button variant="outlined">Outlined</Button> // Medium emphasis
<Button variant="text">Text</Button>         // Low emphasis

// With icons
<Button startIcon={<PlusIcon />}>Add Item</Button>
<Button endIcon={<ArrowIcon />}>Continue</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'elevated' \| 'tonal'` | `'filled'` | Visual style of the button |
| `startIcon` | `ReactNode` | — | Icon before the button text |
| `endIcon` | `ReactNode` | — | Icon after the button text |
| `disabled` | `boolean` | `false` | Disable the button |
| `children` | `ReactNode` | — | Button label text |
| `...props` | `ButtonHTMLAttributes` | — | All native button attributes |

#### Variant Usage Guide

| Variant | Emphasis | Use Case |
|---------|----------|----------|
| `filled` | High | Primary actions (Save, Confirm, Submit) |
| `tonal` | Medium | Secondary actions with emphasis |
| `elevated` | Medium | Actions needing visual separation from patterned backgrounds |
| `outlined` | Medium | Secondary actions, cancel buttons |
| `text` | Low | Tertiary actions (Learn more, View all) |

## 🎨 Theming

The library uses CSS custom properties for theming. Override the default M3 tokens in your CSS:

```css
:root {
  /* Primary color */
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  
  /* Secondary container (tonal button) */
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #1D192B;
  
  /* Surface (elevated button) */
  --md-sys-color-surface-container-low: #F7F2FA;
  
  /* Outline (outlined button border) */
  --md-sys-color-outline: #79747E;
  
  /* State layer opacities */
  --md-sys-state-hover-state-layer-opacity: 0.08;
  --md-sys-state-focus-state-layer-opacity: 0.12;
  --md-sys-state-pressed-state-layer-opacity: 0.12;
}
```

### Dark Mode Example

```css
.dark-theme {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-surface-container-low: #1D1B20;
  --md-sys-color-secondary-container: #4A4458;
  --md-sys-color-on-secondary-container: #E8DEF8;
  --md-sys-color-outline: #938F99;
}
```

## 🏗️ Architecture

### State Layer (M3 Core Concept)

Unlike traditional hover effects that change background colors, M3 uses a **State Layer** — a semi-transparent overlay that indicates interaction state:

```
┌─────────────────────────────────────────────┐
│ Button Container                            │
│ ├─ ::before (State Layer, z-index: 0)      │
│ │   └─ opacity: 0% → 8% (hover) → 12% (press)
│ ├─ Ripple Container (z-index: 1)           │
│ └─ Content (z-index: 2)                    │
└─────────────────────────────────────────────┘
```

### Ripple Effect

Hardware-accelerated ink ripple that:
- Originates from click coordinates
- Scales to cover the entire button
- Fades out over 600ms
- Uses `will-change: transform, opacity` for GPU acceleration

## 🧪 Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests with coverage
npx vitest --coverage

# Build library
npm run build

# Lint
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx          # Component implementation
│       ├── Button.module.css   # M3 styles with state layers
│       ├── Button.stories.tsx  # Storybook stories + tests
│       └── index.ts            # Exports
├── hooks/
│   ├── useRipple.ts            # Ripple effect hook
│   └── index.ts
├── styles/
│   ├── theme.css               # M3 design tokens
│   └── global.css              # Base styles
└── index.ts                    # Library entry point
```

## 📚 Resources

- [Material Design 3 Buttons Spec](https://m3.material.io/components/buttons)
- [M3 Color System](https://m3.material.io/styles/color)
- [M3 State Layers](https://m3.material.io/foundations/interaction/states)
- [M3 Typography](https://m3.material.io/styles/typography)

## 📄 License

MIT © 2026