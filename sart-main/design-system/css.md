# CSS Standards & Rules

Version 1.0

---

# Philosophy

CSS must be strictly structured, maintainable, and mathematically consistent across all components.
Never hardcode colors, spacing, or typography.
Always use predefined CSS variables.

---

# Global Variables

All styles must rely on the root variables defined in the global stylesheet.

**Colors**
`var(--color-bg)` - Background
`var(--color-surface)` - Cards, Dropdowns, Hovers
`var(--color-border)` - Standard Borders
`var(--color-text-primary)` - Headings, Main text
`var(--color-text-secondary)` - Subtitles, Labels, Ghost buttons
`var(--color-primary)` - Main actions, Active states, Accents

**Spacing & Layout**
`var(--radius-sm)` - Small elements (inputs, tags)
`var(--radius-md)` - Medium elements (buttons, small cards)
`var(--radius-lg)` - Large elements (modals, hero cards)
`var(--shadow-sm)` - Subtle elevation
`var(--shadow-md)` - Dropdowns, Hover cards

---

# Strict CSS Rules

1. **NO Hardcoded Values:** Never use `#HEX` or `rgb()` directly in component CSS. Always use variables. If a color doesn't exist in variables, it shouldn't be used.
2. **Flexbox by Default:** Use `display: flex` with `gap`, `align-items`, and `justify-content` for layout. Avoid `float` or absolute positioning unless strictly necessary (e.g., icons inside inputs).
3. **Consistency:** Use the exact same class names for identical elements across the project (e.g., `.btn-ghost-sm`, `.search-box`). Do not recreate `.btn-ghost` as `.button-ghost` in another file.
4. **Scoping:** CSS should be scoped to its component, but variables must come from the global scope.
5. **No Magic Numbers:** Padding, margin, and gaps must follow standard 4px or 8px grid intervals (e.g., 4px, 8px, 12px, 16px, 24px, 32px).
6. **Animations:** Transitions must strictly follow the `150ms ease-out` default for interactions (hover/focus). No custom easing functions unless specified in `animations.md`.

---

# Prohibited

- `!important` (Unless overriding a 3rd party library, use with extreme caution).
- Hardcoded HEX values (`color: #1976FF;` ❌ -> `color: var(--color-primary);` ✅).
- Inline styles in HTML (`style="..."`) unless strictly dynamic via Javascript.
- Magic numbers for sizes (`width: 137px;` ❌).
