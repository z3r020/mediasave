# MediaSave — Vercel Free Starter

A Next.js SEO-first media tools website designed to deploy on Vercel's free tier.

## Deploy for Rp0
1. Create a GitHub repository.
2. Upload this project.
3. Import the repository into Vercel.
4. Framework: Next.js.
5. Build command: `npm run build`.
6. Deploy.
7. Use the free `*.vercel.app` address until you are ready for a custom domain.

## Important
Vercel's free/serverless environment is not a replacement for a persistent FFmpeg VPS. The included UI and SEO pages can be deployed free, while production media processing should later be moved to a dedicated worker/VPS or a suitable media-processing service.

The project does not implement arbitrary platform scraping or remote URL downloading. Only process media you own or have permission to process.

## Adsterra
The `AdSlot` component is a safe placeholder. After your publisher account provides approved ad code, insert the exact official code supplied by Adsterra. Do not invent ad scripts.

## Production upgrade path
Vercel (website/SEO) -> dedicated media worker (FFmpeg) -> object storage -> optional database/analytics.
