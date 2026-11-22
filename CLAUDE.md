# CLAUDE.md — St Joseph Catholic Church (Frontend)

This file tells Claude Code how to work in this repository. Read it fully before making changes.

## What this project is

The website for St Joseph Catholic Church. It is a real project for a real parish.

- This repo is the **frontend only**: React (**JavaScript, not TypeScript**) + Vite.
- The backend is a **separate repo** (`stjoseph_backend`, Django REST Framework). The two connect **only through the API**.
- There is **one developer**, and they are a **beginner** (first full React project). They must understand every change you make.
- UI designs exist as images (desktop and mobile), sent one page at a time.

## How to work with me (strict)

- Be direct. No flattery, no filler.
- **Do not guess.** Never invent component props, library features, settings or package versions. If unsure, say "I am not sure" and how to verify it.
- Label statements when it matters: "certain", "depends on X", or "I don't know".
- **One page or feature at a time.** Keep diffs small enough to review.
- For every step give: the file paths, the code, the exact commands, and the expected result.
- Explain the *why*. Define technical terms the first time you use them.
- If the designs conflict (times, addresses, text, tab bars), point it out **before** building and say which choice you made and why. Don't copy design bugs.
- Warn me before expensive-to-change decisions (routing structure, folder structure, API service shape).
- If my request is unclear, ask **one** clarifying question.
- End longer answers with: what we did, and the next step.
- **Do not commit or push to Git unless I ask.** Work on a branch, never directly on `main`.

## Environment

- Windows, VS Code, **Git Bash** as the terminal.
- Installed: `react-router-dom`, `framer-motion`, `lucide-react` (icons), `sass`. Check `package.json` for exact versions.
- **No new packages without asking me first.**

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # must pass before any change is "done"
npm run preview   # preview the production build
```

Before saying a change is done: `npm run build` passes, and the page has been checked against the design on desktop and mobile.

## Hosting

- Frontend on **Vercel**: https://stjoseph-frontend.vercel.app
- API on Render: https://stjoseph-api.onrender.com (free tier — it can be slow to wake up, so loading states matter).

## Folder structure

```
src/
  components/
    layout/        # Navbar, Footer, MobileTabBar
    common/        # shared reusable pieces
    <page-area>/   # one folder per page area (e.g. home, events)
  pages/
  data/            # mockData.js
  services/        # api.js
  styles/          # SCSS variables, mixins, partials
  assets/images/
```

## Code standards

- Small components, one job each, with a short comment at the top saying what it does.
- **One source of truth** for every piece of content (Mass times, address, phone, email). No text duplicated across components. Components get data through **props**.
- No dead buttons or fake links to pages that don't exist yet.

## Styling

- **SCSS only**, partials with variables and mixins in `src/styles`. Use existing variables/mixins before adding new ones.
- **BEM** class names (`block__element--modifier`).
- Breakpoints: mobile `< 768px`, tablet `768–1023px`, desktop `≥ 1024px`.
- Mobile layouts follow the **mobile design**, not a shrunk desktop.

## Animation

- framer-motion, subtle, short durations.
- Respect `prefers-reduced-motion`.

## Accessibility

- Semantic HTML, alt text on images, `aria-label` on icon-only buttons, visible focus styles, full keyboard support (including modals: focus handling and Escape to close).

## Data and API

- All API calls go through `src/services/api.js`. Base URL comes from **`VITE_API_BASE_URL`**.
- `.env` stays out of Git; keep `.env.example` up to date.
- The backend API is versioned at `/api/v1/`. Field names are **snake_case**.
- Mock data lives in `src/data/mockData.js`, uses the **same snake_case names and shape** as the Django API, and keeps its **"Provisional shape"** comment until the contract is final.
- The mock shape and the backend serializer shape must match. If one changes, flag what breaks.
- Every component that uses real API data needs a **loading state** and an **error state**.
- Feature order: read the design → list the data → agree the API contract → build the UI with mock data → backend endpoint → swap mock for the real API call.

## Content decisions already made

- Address everywhere: **412 Road, Gowon Estate, Ipaja-Lagos**.
- Communion for the Sick / Aged: **Thursday – Friday**.
- Mobile tab bar: **Home, About, Mass & Sacraments, News, More**.
- Eyebrow text **"FAITH • WORSHIP • TOGETHER"** is correct.
- Mass & Sacraments data is the source of truth for Mass times and office hours; Home reads from it.

### Events
- Events page and View Details modal use the **real API** (no mock data).
- No categories or filter pills.
- Keep the **"GATHER, CELEBRATE, SERVE / Upcoming Events"** heading above the card grid (deliberate — do not remove).
- View Details modal has **no footer**; the card's View Details button matches the site theme.
- Reaction row (like/love/pray) is built but hidden unless `VITE_SHOW_REACTIONS=true`. Reactions and "I'm Interested" wait for Member Login.

### Still open (ask before assuming)
- Real office hours: Home design says Mon–Sat 9–5, Mass page says Mon–Thu 9–1.

## Pages

Home (built), About, Mass & Sacraments, Parish News, Societies, Events, Gallery, Contact. Later: Member Login (design not received), search (not defined). Build one at a time from the designs — don't build ahead.
