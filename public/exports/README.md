# Ask Maps screenshot-derived design system

This package documents the visual language visible in nine supplied mobile screenshots. It follows the section structure and editorial presentation depth of the supplied “mynewsbrief – Design System” reference without reusing that reference brand’s assets, colours, fonts, copy, or illustrations.

## Contents

- `ask-maps-design-system.png` — full visual board
- `sections/` — one review PNG per board section
- `html/` — production-built editable HTML/CSS/JS
- `source/` — React component source and CSS
- `tokens.json` — colour, typography, radius, spacing, border and elevation tokens
- `assets/` — untouched source screenshots used by the board

## Reuse

Attach the full PNG to another Figma Make project as the visual reference. For implementation, copy `tokens.json` and consult `source/App.tsx` plus `source/index.css`. The HTML build can be opened from a static web server.

## Accuracy and licensing

Values are screenshot-derived approximations unless explicitly described as observed. Google Sans-like typography is approximated with Manrope because proprietary source font files were not supplied. Logos and icons are labelled recreations, not official distributed brand assets. Supplied screenshots remain unchanged.

## Missing source assets

- Official Ask Maps vector lockup and light-background variant
- Independent map tiles and place photographs
- Original promotional collage illustration
- Original icon vectors
