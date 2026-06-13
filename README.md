# Jasmine Journal

Airy, refined English-language news site for the Tunisia News Platform — white space, hairlines and one green thread. Built with Next.js 16, App Router and Tailwind CSS v4. Reads published articles from the shared backend (`/api/public/jasmine-journal/...`).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend base URL (default `http://localhost:4000`) |
| `NEXT_PUBLIC_SITE_SLUG` | Site slug on the backend (`jasmine-journal`) |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site (`http://localhost:3004`) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense client id (leave empty for placeholders) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | Slot id — banner below the lead story |
| `NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE` | Slot id — end-of-article banner |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Slot id — reserved (unused on this site) |

## Run

```bash
npm install
npm run dev   # http://localhost:3004
```
