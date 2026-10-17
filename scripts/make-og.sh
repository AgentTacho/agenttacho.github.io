#!/usr/bin/env bash
# Composes the social preview card (1200x630) from the icon, the headline, the
# mascot and the dark menu bar shot. Run again after the real screenshots land.
#
# Usage: scripts/make-og.sh [output]
set -euo pipefail

out=${1:-src/assets/images/og.png}
assets=src/assets/agenttacho
bold=${OG_FONT_BOLD:-/System/Library/Fonts/Supplemental/Arial Bold.ttf}
regular=${OG_FONT:-/System/Library/Fonts/Supplemental/Arial.ttf}
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

magick "$assets/icon.png" -resize 72x72 "$tmp/icon.png"
magick "$assets/mascot.webp" -resize x430 "$tmp/mascot.png"
magick "$assets/menubar-dark.webp" -resize x52 "$tmp/menubar.png"

magick -size 1200x630 xc:'#071A1A' \
  "$tmp/icon.png" -geometry +72+64 -composite \
  -font "$bold" -fill '#EAF4F3' -pointsize 34 -annotate +162+112 'AgentTacho' \
  -font "$bold" -fill '#EAF4F3' -pointsize 64 -annotate +72+250 'Usage at a glance.' \
  -font "$bold" -fill '#2BDED4' -pointsize 64 -annotate +72+330 'Nothing more.' \
  -font "$regular" -fill '#9DB5B3' -pointsize 26 -annotate +72+400 'Plan limits and budgets for Claude Code, Codex' \
  -font "$regular" -fill '#9DB5B3' -pointsize 26 -annotate +72+436 'and OpenCode, in one line of your menu bar.' \
  "$tmp/menubar.png" -geometry +72+500 -composite \
  "$tmp/mascot.png" -gravity northeast -geometry +60+110 -composite \
  "$out"
echo "wrote $out"
