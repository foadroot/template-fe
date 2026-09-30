# FOAD Starter Template

A Next.js starter template following the folder structure and implementation patterns of pos-frontend.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **React**: 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first config) + tw-animate-css
- **UI Library**: shadcn/ui (base-nova style, @base-ui/react) + class-variance-authority
- **Icons**: lucide-react
- **Forms**: react-hook-form + @hookform/resolvers + zod v4
- **Tables**: @tanstack/react-table v9
- **Dates**: date-fns + react-day-picker
- **Toasts**: sonner (wrapped in vendor-neutral lib/toast)
- **Auth**: none — the auth screens are UI only; no session is created and no route is protected
- **State**: React Context + useState
- **Package Manager**: pnpm

### Tooling

- **Lint**: ESLint 9 (eslint-config-next)
- **Format**: Prettier + prettier-plugin-tailwindcss
- **Commits**: commitlint (`@commitlint/config-conventional`) + husky
- **Build**: `next build` (Turbopack), `proxy.ts` for request interception

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Routes

| Route                     | Page                                           |
| ------------------------- | ---------------------------------------------- |
| `/`                       | Homepage                                       |
| `/courses`                | Course catalogue (search, filters, pagination) |
| `/courses/[slug]`         | Course details                                 |
| `/courses/[slug]/lessons` | Course lessons                                 |
| `/courses/[slug]/reviews` | Course reviews                                 |
| `/creators`               | Creator discovery (search, categories, paging) |
| `/creators/[handle]`      | Creator profile                                |
| `/login`, `/register`     | Auth screens (UI only)                         |
| anything else             | Branded 404 (`app/not-found.tsx`)              |

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   │   ├── layout.tsx          # Brand panel + form card layout
│   │   ├── login/              # /login
│   │   └── register/           # /register
│   ├── (marketing)/            # Public site, wrapped in the marketing shell
│   │   ├── layout.tsx          # Marketing nav + footer
│   │   ├── page.tsx            # /
│   │   ├── courses/            # /courses and /courses/[slug] (+lessons, reviews)
│   │   └── creators/           # /creators and /creators/[handle]
│   ├── (protected)/
│   │   └── panel/              # Fixed-height application shell
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── not-found.tsx           # Branded 404
│   └── globals.css             # Tailwind v4 + design tokens
├── components/                 # Shared UI components
│   ├── ui/                     # shadcn/ui primitives (button, card, badge, input, label…)
│   ├── layout/                 # Header, Sidebar, marketing nav/footer
│   ├── motion/                 # Animation primitives (marquee)
│   └── shared/                 # Cross-cutting components (brand-logo, section, container…)
├── features/                   # Feature modules (see below)
│   ├── homepage/               # Homepage sections and content
│   ├── courses/                # Catalogue, detail, lessons, reviews
│   ├── creators/               # Creator discovery index and profile
│   └── auth/                   # Sign up / log in forms and schemas
├── lib/                        # Shared libraries
│   ├── apiClient/              # HTTP client layer
│   ├── date/                   # Date formatting service
│   ├── content/                # Copy provenance helper
│   ├── toast.ts                # sonner wrapper
│   ├── money.ts
│   └── utils.ts                # cn() utility + brand type scale for twMerge
├── config/                     # App configuration
│   ├── routes.ts               # Route constants
│   ├── roles.ts                # Role definitions
│   └── cache-config.ts         # Cache tags
├── hooks/                      # Shared hooks (useDebounce)
├── public/                     # Static assets
├── proxy.ts                    # Next proxy (middleware)
└── openspec/                   # OpenSpec change artifacts
```

## Feature Module Pattern

Each feature follows this structure:

```
features/<name>/
├── index.ts          # Public barrel (the ONLY import surface)
├── components/       # Feature-specific components
├── types/            # TypeScript interfaces
├── data/             # Fixture/mock data
├── schemas/          # Zod validation schemas
└── lib/              # Feature-specific helpers
```

Add `actions.ts` (server mutations), `queries.ts` (cached reads), `hooks/` and `config/`
when a feature needs them.

## Import Convention

All imports use the `@/` alias:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/apiClient";
import { routes } from "@/config/routes";
```

## Scripts

| Script    | Command              |
| --------- | -------------------- |
| `dev`     | `next dev`           |
| `build`   | `next build`         |
| `start`   | `next start`         |
| `lint`    | `eslint`             |
| `format`  | `prettier --write .` |
| `prepare` | `husky`              |

## License

MIT
