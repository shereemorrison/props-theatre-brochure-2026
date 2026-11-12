# Props Theatre 2026

Program site for the Props Theatre end-of-year performances. The home menu opens each performance day, the thank-you page, and staffing for 2027.

## Pages

- **Home** — Monday 30th, Tuesday 1st, Wednesday 2nd, Thursday 3rd & Friday 4th, Thank you and Props Be With You, and Staffing 2027
- **Days** — the stages playing that day
- **Stages** — the play, cast, and awards
- **Thank you** — Sharna, Matilda, and the 2026 graduates
- **Staffing 2027** — Alise Amarant, Rob Martin, and a link to the timetable at [propstheatre.com.au/program-2](https://www.propstheatre.com.au/program-2)
- **Contact** and **credits**

## Analytics

Vercel Web Analytics is included with `@vercel/analytics` and rendered in `src/App.tsx`. After the site is deployed on Vercel, turn on Web Analytics for the project in the Vercel dashboard. Visits are recorded from the live deployment.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`vercel.json` sends every route to `index.html` so the client-side pages keep working after a refresh.
