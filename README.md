# AfriYouth Innovation Labs — Website

A modern, responsive website for AfriYouth Innovation Labs, built with **React + Tailwind CSS** (Vite).

## Run it on your computer

1. Install [Node.js](https://nodejs.org) (version 20 or newer).
2. Open this folder in a terminal (VS Code → Terminal → New Terminal).
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open the link it shows (usually http://localhost:5173).

To make a production build: `npm run build` (the output goes to `dist/`).

## Put it online (Vercel)

1. Upload this folder to a GitHub repository.
2. Go to vercel.com → **Add New Project** → choose the repository → **Deploy**.
3. Vercel detects Vite automatically. `vercel.json` makes page links like `/programs` work.
   (For Netlify, `public/_redirects` does the same job.)

## Folder structure

```
src/
  components/   Reusable pieces: Navbar, Footer, Button, cards, forms, maps, doodles
  sections/     Homepage blocks: Hero, AudiencePaths, Pillars, Map, Impact…
  pages/        One file per page: Home, About, Services, Programs, Opportunities…
  data/         ALL text and lists — edit these to change content
  index.css     Brand colours and fonts
```

## How to change content (no coding needed)

| To change…                     | Edit this file             |
|--------------------------------|----------------------------|
| Contact details, menu links     | `src/data/site.js`         |
| Work areas (pillars)            | `src/data/pillars.js`      |
| Services                        | `src/data/services.js`     |
| Programs                        | `src/data/programs.js`     |
| Opportunities (add / close)     | `src/data/opportunities.js`|
| Resources / publications        | `src/data/resources.js`    |
| Impact numbers, partner types   | `src/data/impact.js`       |
| Countries on the map            | `src/data/countries.js`    |
| Photos                          | `src/data/images.js`       |
| Brand colours & fonts           | `src/index.css` (`@theme`) |

To add an opportunity, copy one block in `opportunities.js` and change the text.
Set `status` to `'open'`, `'closing'` or `'closed'`.

## Forms (contact, apply, newsletter)

Forms send messages to email through [Web3Forms](https://web3forms.com) — free, no server needed.
1. Get a free access key on web3forms.com using AfriYouth's email.
2. Paste it in `src/data/site.js` → `formAccessKey`.

Without a key, forms show a success message (demo mode) but don't send anything.

## Photos

Current photos are free-to-use images from Unsplash (real photos, not AI-generated).
Replace them with AfriYouth's own photos: put files in `public/images/` and use
`'/images/your-photo.jpg'` in `src/data/images.js`.

## Placeholder content

Program names, impact numbers, countries, partner types and contact details are placeholders
until the official AfriYouth content is added.

## Key features

- "Who are you?" entry paths for youth, organisations and partners
- Colourful, textile-pattern Africa map with a live network from Kigali
- Interactive "Where we work" map (hover, tap or keyboard)
- Filterable programs, opportunities and resources
- Opportunity pages with requirements + application form
- Animated impact counters and scroll animations (respects reduced-motion settings)
- Fully responsive, keyboard accessible, skip-to-content link
