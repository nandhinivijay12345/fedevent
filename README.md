# FedEvent

A web app for managing event registrations and showcasing the speaker gallery, built with TanStack Start.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite)
- [TanStack Router](https://tanstack.com/router) for file-based routing
- [Supabase](https://supabase.com) for backend/data
- [Tailwind CSS](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com) components

## Getting Started

Install dependencies:

```bash
bun install
```

Copy `.env` and fill in your Supabase credentials:

```
SUPABASE_PROJECT_ID=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

Run the dev server:

```bash
bun run dev
```

## Scripts

- `bun run dev` — start the dev server
- `bun run build` — build for production
- `bun run preview` — preview the production build
- `bun run lint` — run ESLint
- `bun run format` — format code with Prettier

## Project Structure

- `src/routes` — file-based routes (pages)
- `src/components` — shared UI components
- `src/integrations` — third-party integrations (e.g. Supabase)
- `supabase` — Supabase config and migrations

## Notes

This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history (force pushing, rebasing/amending/squashing pushed commits), since changes sync back to the Lovable editor.
