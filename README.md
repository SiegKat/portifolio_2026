# Thiago Costa - Portfolio

Bilingual personal portfolio showcasing my work in AI, software engineering, and data science. Built from the ground up with a modern React stack and deployed on AWS Amplify.

**Live:** Deployed via AWS Amplify

## Features

- **Bilingual (EN/PT)** with automatic locale detection and a one-click language toggle
- **Dark / Light theme** that respects system preferences
- **Project showcase** with tag filtering, GitHub links, and interactive reaction indicators
- **Responsive design** optimized for desktop and mobile
- **Smooth animations** powered by Framer Motion
- **Markdown rendering** for project detail pages (fetched directly from GitHub READMEs)
- **AWS Amplify backend** for persistent reaction counts (graceful localStorage fallback)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Routing | React Router DOM v7 |
| i18n | react-i18next + i18next-browser-languagedetector |
| Backend | AWS Amplify Gen 2 (AppSync + DynamoDB) |
| Hosting | AWS Amplify Hosting |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
  components/      # Reusable UI components (Header, ProjectCard, etc.)
    about/         # About page section components
  pages/           # Route-level pages (About, Projects, ProjectView)
  locales/         # Translation files (en.json, pt.json)
  config.ts        # Global constants (GitHub username, content URLs)
  i18n.ts          # i18next configuration
amplify/
  backend.ts       # Amplify Gen 2 backend definition
  data/resource.ts # GraphQL schema (BlogPostLike, ProjectIndicator)
public/
  assets/          # Images, logos, and static files
```

## Configuration

Edit `src/config.ts` to update the GitHub username and content source URLs:

```typescript
export const GITHUB_USERNAME = "SiegKat";
```

## License

MIT
