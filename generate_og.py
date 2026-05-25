from PIL import Image, ImageDraw, ImageFont
import os

# Canvas: 1200x630 (OG recommended)
W, H = 1200, 630
img = Image.new('RGB', (W, H), '#0d1117')
draw = ImageDraw.Draw(img)

# Colors
ACCENT = '#58a6ff'
WHITE = '#f0f6fc'
GRAY = '#8b949e'
DARK = '#161b22'

# Fonts
font_dir = '/System/Library/Fonts'
try:
    title_font = ImageFont.truetype(os.path.join(font_dir, 'SFNS.ttf'), 72)
    subtitle_font = ImageFont.truetype(os.path.join(font_dir, 'SFNS.ttf'), 32)
    tag_font = ImageFont.truetype(os.path.join(font_dir, 'SFNS.ttf'), 22)
    small_font = ImageFont.truetype(os.path.join(font_dir, 'SFNS.ttf'), 20)
except:
    title_font = ImageFont.load_default()
    subtitle_font = title_font
    tag_font = title_font
    small_font = title_font

# Background: subtle gradient-ish effect with geometric shapes
# Add a subtle accent bar at top
draw.rectangle([(0, 0), (W, 4)], fill=ACCENT)

# Decorative circles (subtle, low opacity)
for x, y, r, alpha in [(1000, 100, 200, 20), (150, 500, 150, 15), (1100, 500, 100, 10)]:
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.ellipse([(x-r, y-r), (x+r, y+r)], fill=(88, 166, 255, alpha))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(img)

# Title: Carlos Carrillo
title = "Carlos Carrillo"
tw = draw.textlength(title, font=title_font) if hasattr(draw, 'textlength') else title_font.getsize(title)[0]
draw.text(((W - tw) / 2, 160), title, fill=WHITE, font=title_font)

# Subtitle: CTO & Software Architect
subtitle = "CTO & Software Architect"
sw = draw.textlength(subtitle, font=subtitle_font) if hasattr(draw, 'textlength') else subtitle_font.getsize(subtitle)[0]
draw.text(((W - sw) / 2, 250), subtitle, fill=ACCENT, font=subtitle_font)

# Decorative line
line_y = 305
draw.rectangle([(W/2 - 100, line_y), (W/2 + 100, line_y + 2)], fill=ACCENT)

# Experience line
exp = "20+ años de experiencia · Sistemas distribuidos · Liderazgo técnico"
ew = draw.textlength(exp, font=small_font) if hasattr(draw, 'textlength') else small_font.getsize(exp)[0]
draw.text(((W - ew) / 2, 335), exp, fill=GRAY, font=small_font)

# Tech tags
tags = ['C#/.NET', 'Node.js', 'Python', 'AWS', 'Azure', 'Microservicios', 'Docker', 'Kubernetes']
tag_y = 410
tag_x_start = W / 2 - (len(tags) * 100) / 2  # rough centering

for i, tag in enumerate(tags):
    x = tag_x_start + i * 130 - 40
    # Pill background
    tw_tag = draw.textlength(tag, font=tag_font) if hasattr(draw, 'textlength') else tag_font.getsize(tag)[0]
    pad_x = 14
    pad_y = 8
    draw.rounded_rectangle(
        [(x, tag_y), (x + tw_tag + pad_x * 2, tag_y + 36)],
        radius=18,
        fill=DARK,
        outline=ACCENT,
        width=1
    )
    draw.text((x + pad_x, tag_y + pad_y - 2), tag, fill=ACCENT, font=tag_font)

# Bottom URL
url = "carloscarrillo.github.io"
uw = draw.textlength(url, font=small_font) if hasattr(draw, 'textlength') else small_font.getsize(url)[0]
draw.text(((W - uw) / 2, H - 50), url, fill=GRAY, font=small_font)

# Save
output_path = 'assets/img/og-image.png'
img.save(output_path, 'PNG')
print(f'Saved: {output_path} ({W}x{H})')
