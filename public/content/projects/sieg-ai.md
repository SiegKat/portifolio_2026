## Overview

SIEG IA is a full-stack web platform for discovering, exploring, and evaluating AI tools. Users can browse a curated catalog of 80+ AI tools across 14 categories (text, image, audio, video, development, marketing, and more), read detailed reviews, and save favorites.

## Key Features

- **AI Tool Catalog** -- 80+ tools with ratings, categories, tags, and detailed descriptions. Each tool has a dedicated detail page with reviews, related tools, and external resources (YouTube, Instagram, courses).
- **Advanced Search & Filtering** -- Full-text search with filtering by category, type (free/paid), and sorting by rating.
- **17-Language Support** -- Fully internationalized UI using i18next, supporting English, Portuguese, Spanish, French, German, Italian, Japanese, Korean, Chinese (Simplified & Traditional), Russian, Arabic, Turkish, Dutch, Polish, Vietnamese, and Bulgarian.
- **User Authentication** -- Supabase-powered auth with user profiles and personalized favorites.
- **SIEG Chat** -- Integrated AI chat interface with multiple specialized agents.
- **News & Books** -- Curated AI news articles and book recommendations with dedicated detail pages.
- **Dark/Light Theme** -- Theme toggle with system preference detection.
- **Responsive Design** -- Mobile-first layout with parallax effects and animated transitions.
- **Real-time Stats** -- Live platform statistics (users, tools, ratings) pulled from Supabase.

## Architecture

- **Frontend:** React 18 with TypeScript, bundled with Vite 5 and SWC for fast builds. UI built with shadcn/ui (Radix primitives) and styled with Tailwind CSS.
- **Backend:** Supabase for authentication, PostgreSQL database, and real-time data. SQL migrations managed via Supabase CLI.
- **State Management:** TanStack Query for server state, React Context for auth.
- **Routing:** React Router v6 with client-side navigation and scroll restoration.
- **Forms & Validation:** React Hook Form with Zod schemas.
- **Internationalization:** i18next with per-language JSON resource bundles and lazy loading.
