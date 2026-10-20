#!/usr/bin/env bash
# Writes neutral placeholder screenshots for every shot the demo build will
# capture (brainstorm 18, shot list). They keep the page buildable until the
# real screenshots replace them. Never commit crops of real usage data.
#
# Usage: scripts/make-placeholders.sh [target-dir]
set -euo pipefail

dir=${1:-src/assets/agenttacho}
font=${PLACEHOLDER_FONT:-/System/Library/Fonts/Supplemental/Arial.ttf}
mkdir -p "$dir"

shot() {
  local stem=$1 size=$2
  magick -size "$size" xc:'#EAF3F2' -fill '#055653' -font "$font" -gravity center \
    -pointsize 40 -annotate +0+0 "$stem" -quality 90 "$dir/$stem-light.webp"
  magick -size "$size" xc:'#0B2222' -fill '#2BDED4' -font "$font" -gravity center \
    -pointsize 40 -annotate +0+0 "$stem" -quality 90 "$dir/$stem-dark.webp"
}

shot menubar 900x124
for stem in plan-limits pace alert budget prices details harnesses same-provider; do
  shot "$stem" 1660x400
done
shot groups 1600x1000
shot menubar-settings 1600x1000
shot dropdown 1023x1538
