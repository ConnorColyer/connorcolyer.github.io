# Connor Colyer Portfolio

A modern, minimal personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Create a new Vercel project and import the repository.
3. Use the default settings (Next.js detected automatically).
4. Set the production domain in `src/app/layout.tsx` if you use a custom URL.
5. Deploy.

## Edit content

All content lives in a single file:

- `src/content/site.ts`

Update the arrays and strings in that file to change projects, experience, awards, skills, and contact info.

## Contact form behavior

The contact form is client-side only. It opens a prefilled `mailto:` draft using the visitor's default email client. No data is stored or processed on the server.

## Analytics

A placeholder comment is included in `src/app/layout.tsx` for adding Plausible or Vercel Analytics.
