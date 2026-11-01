# JEET COMPUTERS: AI image prompts (corporate redesign)

The images currently in `images/` are neutral grey placeholders with **no text**. Generate real photos, save each with the **exact file name** shown, and replace the placeholder. No code changes are needed.

## Rules for every image
- Realistic photograph of a normal, professional computer business. **Not** a gaming look.
- **No text, no logos, no buttons, no UI graphics, no watermarks** inside the image. All website text is added by the HTML.
- No neon, no RGB lighting, no green tint, no colour overlays. Use natural, neutral daylight and a white, grey or wood colour scheme.
- Add this to the end of every prompt: *"photorealistic, no text, no logos, no watermarks, no brand names, no neon or RGB lighting, neutral colours, natural lighting"*.
- Hero photos sit on the **right half** of the banner (about 7:5 ratio, at least 1400 x 1000 px). Keep the subject centred.
- Save as JPG and compress to under 250 KB each (squoosh.app or tinypng.com).
- Use a different scene for every image so nothing repeats.

---

## Hero banners (shown on the right side of each slide)

**images/hero-1.jpg** (slide: Technology That Keeps Your Business Moving)
> Photograph of a technician in a plain dark polo shirt setting up a desktop computer and monitor on a tidy white desk in a bright modern office, neat cable management, large windows with soft daylight, shallow depth of field.

**images/hero-2.jpg** (slide: Smart Solutions. Better Performance.)
> Clean, well-organised desk with two matching monitors, a keyboard and a mouse in a modern office, a professional reviewing a spreadsheet on screen (screen content blurred and unreadable), neutral grey and white colours, soft natural daylight.

**images/hero-3.jpg** (slide: Your Technology Partner, Every Step of the Way)
> Friendly computer service consultant and a customer looking at a laptop together across a clean counter in a bright computer store, shelves of laptops softly blurred behind them, warm natural light, genuine smiles.

---

## About Us

**images/about.jpg** (5:4 ratio, 1000 x 800 px)
> Professional computer workspace seen from a slight angle: light wood desk, a modern all-in-one computer, a keyboard, a mouse, a notebook and a pen, a laptop beside it, tidy cables, bright natural daylight, white wall, minimal and uncluttered.

---

## Services
The service cards use **black line icons** (inline SVG in `index.html`), so no service photos are needed. Change the icons if your real services differ: replace the `<svg>` inside the card.

---

## Editing the website content

| What | Where |
| --- | --- |
| Hero text and buttons | `index.html`, section "2. HERO SLIDER" |
| Services (title, text, icon) | `index.html`, section "4. SERVICES" |
| Phone, email, address | `index.html`, section "6. CONTACT" and the footer |
| WhatsApp number | `index.html`, the `wa.me/910000000000` link (country code + number, digits only) |
| Form destination email | `js/script.js`, `CONTACT_EMAIL` |
| Slide speed | `js/script.js`, `SLIDE_INTERVAL` |
| Statistics | `index.html`, `data-target` and `data-suffix` on each `.counter` |
| Colours | `css/style.css`, `:root` variables at the top |
