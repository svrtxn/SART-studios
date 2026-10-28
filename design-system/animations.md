# animations.md

Version 1.0

---

# Philosophy

Motion should explain.

Motion should never distract.

Every animation has a purpose.

Animations must feel natural.

Fast interfaces feel premium.

Never animate simply because you can.

---

# Core Principles

Fast

Smooth

Subtle

Purpose Driven

Consistent

Predictable

Natural

---

# Timing

Instant

0ms

Immediate feedback.

---

Ultra Fast

100ms

Hover effects.

---

Fast

150ms

Buttons

Inputs

Icons

---

Normal

200ms

Cards

Dropdowns

Sidebar

---

Medium

300ms

Dialogs

Sheets

Page transitions

---

Slow

500ms

Hero animations

Illustrations

Never exceed this.

---

# Easing

Primary

ease-out

Default for almost everything.

---

Secondary

ease-in-out

Dialogs

Drawers

---

Never

Bounce

Elastic

Overshoot

Cartoon animations

---

# Hover Effects

Buttons

Brightness +5%

TranslateY(-2px)

Duration

150ms

---

Cards

TranslateY(-4px)

Shadow Medium

Border Blue (optional)

---

Icons

Scale

1.05

Rotate

0°

Never spin.

---

Links

Underline Fade

Color Transition

150ms

---

# Focus

Border Blue

Shadow Blue 20%

Duration

120ms

No flashing.

---

# Active State

Scale

0.98

Duration

80ms

---

# Page Transitions

Fade

Opacity

0 → 100

Duration

250ms

---

Slide

Y

16px → 0

Opacity

0 → 100

---

Never

Rotate pages

Zoom pages

Flip pages

---

# Modals

Overlay

Fade

200ms

Modal

Scale

0.96 → 1

Opacity

0 → 100

Duration

220ms

---

Exit

Reverse

180ms

---

# Drawer

Slide

Right → Left

Desktop

Bottom → Top

Mobile

Duration

250ms

---

# Dropdown

Opacity

0 → 100

Y

-8px → 0

Duration

160ms

---

# Tooltip

Delay

300ms

Fade

120ms

---

# Toast

Slide

Right

Fade

Duration

250ms

Auto Close

5 seconds

---

# Sidebar

Collapse

220ms

Width Animation

Only

Never animate every child.

---

# Accordion

Height Auto

Opacity

Duration

220ms

---

# Tabs

Underline

Slide

Duration

180ms

Content

Fade

---

# Skeleton

Pulse

1.6s

Infinite

Opacity only.

---

# Loading Spinner

Rotation

Linear

Infinite

800ms

---

# AI Chat

Message

Fade

+

Slide Up

12px

Duration

180ms

Streaming Text

Character by Character

Natural

---

Typing Indicator

Three Dots

Opacity Animation

Never bounce.

---

# Notifications

Fade

Slide Down

Duration

250ms

---

# Charts

Animate Once

On Load

Duration

600ms

Never loop.

---

# Hero Section

Fade

Slide Up

Scale

98%

→100%

Duration

500ms

---

# Scroll Reveal

Offset

40px

Fade

Duration

400ms

Only once.

---

# Mobile Gestures

Swipe

Drawer

Back Navigation

Bottom Sheet

Interactive

---

# Microinteractions

Checkbox

Check Animation

150ms

---

Switch

Slide

150ms

---

Progress Bar

Smooth Width

---

Like Button

Scale

1.1

Return

1

Duration

180ms

---

# Reduced Motion

Respect

prefers-reduced-motion

Disable

Hero Animations

Page Animations

Large Transitions

Keep

Hover

Focus

Essential feedback

---

# Framer Motion Defaults

duration

0.22

ease

easeOut

stagger

0.05

---

# Performance Rules

60 FPS

GPU Accelerated

Transform

Opacity

Avoid

Width

Height

Top

Left

Animation

Whenever possible.

---

# Interactive Micro-Atmosphere

## Cursor Sparkle & Glow Follower

Duration

120ms - 180ms ease-out lag (organic inertia).

Properties

- `transform: translate3d(x, y, 0)` for hardware acceleration.
- `scale(1)` to `scale(1.35)` on interactive element hover.
- Opacity: 0 when cursor exits viewport, 1 while inside.

Rules

- Never block clicks (`pointer-events: none`).
- Respect `prefers-reduced-motion` and touch displays.
- Keep light levels soft (max 15% opacity on background aura).

---

## Dynamic Card Spotlight

Properties

- Radial gradient positioned at CSS variables `--mouse-x` and `--mouse-y`.
- Smooth transition on enter and leave (200ms ease-out).
- Subtle border glow in SART Primary Blue (`#1976FF`).

---

# Never Do

Infinite floating cards.

Parallax everywhere.

Rotating buttons.

Shaking cards.

Bounce effects.

Large delays.

Long loading animations.

Flashing elements.

Excessive gradients.

Animations without purpose.

---

# Golden Rule

The user should notice the product.

Not the animation.