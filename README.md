# digiclave-technologies

Website for DigiClave Technologies.

## Getting started

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Service pages and search indexing

The production site uses `https://digiclave-technologies.vercel.app/`.
Service pages have their own titles, descriptions, canonical URLs, and
structured service data. `public/robots.txt` points crawlers to
`public/sitemap.xml`; update the sitemap and page canonical URLs if the
production domain changes.

After deploying, verify the domain in Google Search Console, submit
`https://digiclave-technologies.vercel.app/sitemap.xml`, and request
indexing for the homepage and service pages. Search Console access and
verification must be completed by an account owner.

## Inquiry event groundwork

The app queues these privacy-safe interaction events in `window.dataLayer` and
dispatches `digiclave:track` browser events:

- `whatsapp_click` with the CTA placement and, where relevant, service ID.
- `inquiry_whatsapp_open` with the selected service only; form details,
  messages, email addresses, and phone numbers are never included.
- `project_visit` when a visitor opens the Precise Learning project.

No analytics provider is loaded and no event data leaves the browser until an
analytics container is deliberately configured. Add an approved Google Tag
Manager container and consent handling before enabling analytics collection.
WhatsApp enquiries continue to be sent directly by the visitor.
# digiclave-technologies
