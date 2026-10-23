# Make Merry Events — website

Six pages, no build step. Upload this folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

| Page | File |
|---|---|
| Home | index.html |
| Experiences | experiences.html |
| Portfolio | portfolio.html |
| Plan your event (the interactive planner) | plan.html |
| About + FAQ | about.html |
| Contact (short form) | contact.html |

Shared files: `assets/site.css` (design), `assets/site.js` (behaviour), `assets/config.js` (all business details).

## 1. Edit the business details — `assets/config.js`
Empty fields are hidden automatically, so nothing invented ever shows.
- `whatsapp` — digits with country code, e.g. 2348012345678
- `phone`, `email`, `address`, `hours`, `social` — only confirmed details
- `about` — the owner's own short story
- `formEndpoint` — where enquiries are sent (see below)
- `conceptMode` — set to `false` once real photos are in (removes "Illustration" labels)
- `categories`, `services`, `budgets`, `guestRanges`, `faq`, `marquee` — proposed content; confirm and edit

## 2. Make enquiries send
1. **Form service (recommended):** create a free form at formspree.io, paste its URL (`https://formspree.io/f/xxxx`) into `formEndpoint`, then send a test enquiry. A thank-you message appears only when the service confirms it received it.
2. **WhatsApp only:** fill in `whatsapp`. Visitors get an "Open WhatsApp" button with their message pre-written.
3. **Neither set:** visitors are told sending isn't connected and can copy their message.

## 3. Add real photos
Export WebP (~1600px long side, under ~250 KB), put them in `photos/`, then in `config.js` add `image` and `alt` to a portfolio item:
`{ cat:'wedding', title:'Reception', image:'photos/reception.webp', alt:'Gold-lit reception hall', ar:'3/2', scene:'hall', style:'elegant', seed:105 }`
Use only photos of real Make Merry Events work, with the client's permission.

## 4. Before launch
- [ ] Contact details, services, budgets and FAQ confirmed by the owner
- [ ] `formEndpoint` set and a test enquiry received
- [ ] Real photos added, then `conceptMode: false`
- [ ] Add an `og:image` (1200×630 photo) to each page's `<head>` for nice link previews on WhatsApp
- [ ] Test on a real phone over mobile data
