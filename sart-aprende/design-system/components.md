# components.md

Version 1.0

---

# Philosophy

Components are building blocks.

Every component should solve one problem.

Never create unique components when a reusable one can exist.

Everything should be modular.

Everything should be scalable.

Everything should be accessible.

---

# Component Principles

Consistent

Reusable

Responsive

Accessible

Composable

Minimal

Predictable

---

# Naming Convention

Button

Card

Input

Modal

Dropdown

Avatar

Badge

Alert

Tooltip

Navbar

Sidebar

Breadcrumb

Tabs

Table

Pagination

Accordion

Command

Dialog

Toast

Sheet

Popover

Calendar

Chart

Timeline

StatCard

MetricCard

AIChat

CodeBlock

Terminal

---

# Border Radius

Small

8px

Medium

12px

Large

16px

XL

24px

Round

999px

---

# BUTTONS

Purpose

Primary action.

One primary button per section.

---

Primary Button

Background

Primary Blue

Text

White

Radius

16px

Height

48px

Padding

12px 24px

Hover

Brightness +5%

Lift 2px

Shadow Medium

---

Secondary Button

White

Border Primary

Blue Text

Hover

Light Blue Background

---

Ghost Button

Transparent

No Border

Blue Text

Hover

Background Neutral 100

---

Danger Button

Background Red

White Text

Only destructive actions.

---

Success Button

Background Green

White Text

Only confirmations.

---

Icon Button

Square

40px

Centered Icon

Radius 12px

---

Loading Button

Spinner Left

Disable Click

Maintain Width

---

# CARDS

Purpose

Group related content.

---

Default Card

Background White

Radius 24px

Padding 32px

Border Neutral 200

Shadow Small

---

Elevated Card

Same Card

Medium Shadow

Hover Lift

---

Glass Card

Opacity 70%

Blur 20px

Only Hero Sections

---

Metric Card

Large Number

Small Label

Optional Trend

Icon Top Right

---

Feature Card

Icon

Title

Description

CTA

---

Dashboard Card

Header

Body

Footer Optional

---

Pricing Card

Plan Name

Price

Features

CTA

Highlighted Plan Optional

---

# INPUTS

Default Height

48px

Radius

14px

Padding

16px

Border

Neutral

Focus

Primary Blue

---

Input States

Default

Hover

Focus

Disabled

Error

Success

---

Search Input

Leading Search Icon

Clear Button

Placeholder

Search...

---

Password Input

Show Hide Toggle

Strength Meter Optional

---

Textarea

Minimum Height

120px

Auto Resize

---

Select

Chevron Icon

Search Optional

Grouped Options

---

Checkbox

20px

Rounded

Primary Blue

---

Radio

20px

Filled Center

---

Switch

48 x 28

Animated

---

Slider

Primary Blue

Rounded Thumb

---

# BADGES

Success

Green

Warning

Yellow

Danger

Red

Info

Blue

Neutral

Gray

Rounded

999px

---

# ALERTS

Success

Green Border

Green Background

---

Error

Red Border

Red Background

---

Warning

Yellow Border

Yellow Background

---

Info

Blue Border

Blue Background

---

Always include

Title

Description

Dismiss

---

# NAVBAR

Height

72px

Logo Left

Navigation Center

CTA Right

Sticky

Background Blur

---

# SIDEBAR

Collapsed

72px

Expanded

280px

Icons

Lucide

Groups

Optional

---

# FOOTER

Minimal

Large Padding

Social Icons

Legal Links

Logo

---

# TABLES

Rounded

Header Sticky

Alternating Rows Optional

Hover Highlight

Responsive Scroll

---

Columns

Sortable

Filterable

Resizable Optional

---

# PAGINATION

Previous

Numbers

Next

Always keyboard accessible

---

# MODALS

Max Width

600px

Radius

24px

Overlay Blur

Close ESC

Close Button

Focus Trap

---

# DRAWER

Slide Right

Mobile Bottom Sheet

Radius

24px

---

# DROPDOWN

Shadow Small

Radius 16px

Padding 8px

Keyboard Navigation

---

# TOOLTIP

Delay

300ms

Small Shadow

Dark Background

Rounded

---

# POPOVER

Interactive

Can Contain Forms

Radius

16px

---

# ACCORDION

Animated Height

One Open Default

Multiple Optional

---

# TABS

Underline Active

Animated

Keyboard Navigation

---

# BREADCRUMB

Chevron Divider

Current Page Bold

---

# AVATAR

Sizes

32

40

48

64

96

Fallback Initials

Online Indicator Optional

---

# PROGRESS

Linear

Circular

Animated

Primary Blue

---

# SKELETON

Neutral Gray

Pulse Animation

Match Final Layout

---

# TOAST

Top Right

Auto Close

Pause On Hover

---

# LOADER

Spinner

Dots

Progress Bar

Skeleton

Choose according to context.

---

# EMPTY STATES

Illustration

Title

Description

Primary CTA

Never show empty screens.

---

# FILE UPLOAD

Drag and Drop

Click Upload

Preview

Progress

Remove

---

# CALENDAR

Month View

Week View Optional

Keyboard Navigation

---

# COMMAND PALETTE

Inspired by Raycast

Search

Actions

Keyboard First

CMD + K

---

# SEARCH

Instant Results

Keyboard Navigation

Debounced

Highlighted Matches

---

# DASHBOARD WIDGETS

Stat Card
Revenue Card
Chart Card
Recent Activity
Tasks
Calendar
Notifications
Shortcuts
Quick Actions

---

# LEARNING ROUTE COMPONENTS

Route Summary Card

Route Name

Progress

Completed Pomodoros

Primary Action

---

Learning Module Card

Module Title

Learning Goal

Pomodoro Progress

External Course Links

Completion State

---

Focus Timer

Work and Break Modes

Course Selection Required for Work

Start

Pause

Reset

Persist completed Pomodoros

---

Learning Completion Dialog

Completion Message

Close Action

Keyboard Accessible

Focus Return

---

Blocked Route Action

Disabled Appearance

Accessible Explanation

Informative Dialog

No Route Creation

---

# MODULE APPROVAL

Sequential Learning Module

Pomodoro Goal

Manual Approval After Technical Challenge

Next Module Locked Until Approval

Approval State Persisted

---

# ENGLISH COURSE TRACKER

Unit and Lesson Progress

Sequential Lesson Unlocking

Final Exam Score Entry

70% Passing Threshold

Next-Level Unlock Dialog

---

# GEMINI LEARNING CHAT

Assistant Conversation

Contextual Learning Prompts

Accessible Message Composer

Loading and Error States

Server-Side API Key

---

# THEME TOGGLE

Light and Dark Modes

Persistent Preference

Accessible Toggle Label

Design-System Color Tokens

---

# AI COMPONENTS

AI Chat

Streaming Messages

Markdown

Code Highlight

Typing Indicator

Suggested Prompts

Prompt Input

Conversation History

Token Counter Optional

Temperature Optional

Model Selector

Attachment Support

Voice Optional

---

# CODE BLOCK

Syntax Highlight

Copy Button

Filename Optional

Line Numbers Optional

---

# TERMINAL

JetBrains Mono

Dark Theme

Rounded

Copy Button

---

# CHARTS

Use Recharts.

Rounded.

Minimal Grid.

Few Colors.

Primary Blue.

---

Supported

Line

Area

Bar

Pie

Radar

Heatmap

Timeline

---

# MOBILE

Minimum Touch Target

44px

Bottom Navigation

Optional

Floating CTA

Allowed

---

# RESPONSIVE

Desktop First

Tablet

Mobile

Never hide critical actions.

---

# ACCESSIBILITY

ARIA Labels

Keyboard Navigation

Visible Focus

Screen Reader Support

Contrast AA

---

# DO NOT

Use more than one primary button.

Mix border radius.

Use random shadows.

Invent spacing.

Use decorative icons.

Over animate components.

Duplicate existing components.

Every new component must first be documented here.

---

# EDITORIAL PRODUCT COMPONENTS

## Product Index Card

Purpose

Present a SART product as part of a coherent ecosystem while giving it room for its own identity.

Required

- Official product sublogo, preserved in its original proportions.
- Visible index or category label.
- Product name and concise description.
- Status expressed with text, not color alone.
- One clear action, or a visibly disabled state with an explanation.

Variants

- Standard
- Featured
- Compact

Cards may use an intentionally asymmetric grid. Do not hide essential content behind hover.

## Directional Action

Purpose

Make the destination or direction of an action easy to recognize.

Rules

- Reuse Primary, Secondary, or Ghost Button styles.
- Keep the action label visible in every state.
- The direction mark may shift or reveal a short path on hover and focus; it must not change the hit area or layout.
- Provide equivalent keyboard-focus, active, touch, and reduced-motion behavior.

## Layered Spotlight

Purpose

Give one important product, task, or announcement a distinct visual focus.

Structure

- One content layer with a clear title and action.
- One frame, offset plane, or brand-colored surface for depth.
- Optional index or status marker.

Use only documented colors, spacing, borders, and shadows. Decorative layers are hidden from assistive technology and never contain unique information.

## Progress Path

Purpose

Explain ordered steps, modules, or a learning route.

Rules

- Identify completed, current, next, and locked steps with labels or icons as well as color.
- Keep the next available action obvious.
- Preserve sequence and state when motion is disabled.
- Support keyboard navigation and small screens.
