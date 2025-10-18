# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 14 SaaS dashboard** for SEO outreach campaign management, powered by Anthropic's Claude API. It features automated directory submissions, AI-generated unique copy, and duplicate detection with a mock data backend.

**Tech Stack:**
- Next.js 14 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3 + Shadcn/ui (45 accessible components)
- Supabase (auth/database) + Stripe (payments) - dependencies ready but not yet integrated
- Vercel-optimized deployment

---

## Development Commands

**Start development server** (http://localhost:3000):
```bash
npm run dev
```

**Production build:**
```bash
npm run build        # Compile Next.js app
npm start            # Run production server
```

**Code formatting:**
```bash
npx prettier --write "src/**/*.{ts,tsx}"
```

---

## Coding Standards

Follow conventions in `AGENTS.md`:
- **Indentation:** Two spaces
- **Quotes:** Single quotes
- **Semicolons:** Always required
- **Filenames:** Kebab-case (e.g., `ai-copy-summary.tsx`)
- **Formatting:** No formatting-only changes mixed with features
- **Testing:** Team alignment required before introducing Vitest/Playwright

---

## Architecture & File Structure

### High-Level Architecture

```
Root Layout (layout.tsx)
└── Dashboard Page (page.tsx) - Client component
    ├── Metrics Grid (4 KPI cards)
    ├── Timeline + AI Summary (2-column)
    ├── Impact Task Board (Kanban)
    └── Tabs (4 sections):
        ├── Directory Submissions (searchable table)
        ├── Duplicate Detection (confidence scores)
        ├── Blog Outreach (contact pipeline)
        └── Templates (email library)
```

### Key Directories

- **`src/app/`** - Next.js App Router pages/layouts
- **`src/components/dashboard/`** - Feature components (8 files)
  - `DirectorySubmissions.tsx` - Main directory table with search/filter
  - `DuplicateDetectionPanel.tsx` - Duplicate flagging
  - `BlogOutreach.tsx` - Contact pipeline
  - `TemplateLibrary.tsx` - Email templates
  - `AutomationTimeline.tsx` - Scheduled tasks
  - `ImpactTaskBoard.tsx` - Kanban board
  - `AiCopySummary.tsx` - Claude statistics
  - `MetricCard.tsx` - KPI display component
- **`src/components/ui/`** - Shadcn/ui primitives (45 components)
- **`src/lib/`** - Utilities and mock data
  - `mock-data.ts` - 100 directory submissions + automation tasks
  - `utils.ts` - Tailwind `cn()` merge utility
- **`src/types/index.ts`** - 7 core TypeScript interfaces

### Data Types

**Core domain interfaces** (src/types/index.ts):

```typescript
DirectorySubmission  // Directory entry with DA, status, AI descriptions
DuplicateDetection   // Duplicate flag with confidence score
BlogContact          // Outreach contact with DA ranking
OutreachTemplate     // Email templates (subject + body)
AutomationTask       // Scheduled submission cadence
SeoTask              // Kanban board items (impact-scored)
AiGenerationSummary  // Claude usage metrics
```

**Mock Data Pattern:**
- 100 directories organized into 5 tiers (DA 90+ to DA 50-79)
- Anthropic model references: `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku`
- AI status tracking: `generated`, `draft`, `regenerating`
- Located in: `src/lib/mock-data.ts` (500 lines)

---

## Component Patterns

### State Management
- **Approach:** Lightweight, client-side `useState` only
- **No global state library** (Redux/Zustand)
- **Data flow:** Mock data → page.tsx calculates KPIs → props to components
- **Example:** `DirectorySubmissions` filters by status + search query locally

### Common Filtering/Sorting Patterns
```typescript
// Multi-filter in DirectorySubmissions
const filtered = mockDirectorySubmissions
  .filter(d => d.status === statusFilter && d.directoryName.includes(searchQuery))
  .sort((a, b) => /* sort by selected column */);
```

### Styling Architecture
- **Framework:** Tailwind CSS with HSL CSS variables
- **Dark mode:** Class-based (`.dark` applied to root)
- **Color system:** Semantic tokens (`--primary`, `--accent`, `--destructive`, etc.)
- **Gradients:** `bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`
- **Responsive:** Mobile-first breakpoints (sm, md, lg, xl, 2xl)
- **Example grid:** `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`

### UI Primitives
Frequently used Shadcn/ui components:
- `Card` - Content containers
- `Table` - Data tables with sticky headers
- `Badge` - Status/category labels (color-coded by tier)
- `Dialog` - Modals for AI copy viewing
- `Tabs` - Section navigation
- `Button` - Actions (outline, ghost, default variants)
- `Select` - Dropdown filters
- `Input` - Search/text fields

---

## Performance & Rendering Strategy

**Next.js Rendering:**
- **Server Components:** Root layout only (for metadata)
- **Client Components:** All feature pages marked with `"use client"`
- **No API routes:** Mock data eliminates network latency
- **Image optimization:** Unsplash CDN configured in `next.config.js`

**Optimizations:**
- Tailwind purges unused CSS at build time
- React 18 concurrent rendering + automatic batching
- Sticky table headers for large datasets
- No external API calls (mock data only)

---

## Integration Points (Ready for Backend)

1. **Supabase** - Already imported
   - Database queries to replace mock data
   - Authentication ready

2. **Anthropic API** - Model references exist
   - AI descriptions mock-generated
   - Replace with live `claude-3-*` API calls

3. **Stripe** - Dependency installed
   - No payment logic yet

4. **Testing** - Framework not yet added
   - Vitest (unit) or Playwright (E2E)
   - Mock data pattern established for fixtures

---

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main dashboard (1325 lines) - orchestrates all components |
| `src/lib/mock-data.ts` | 100 mock directories + tasks - fixture data |
| `src/types/index.ts` | Domain type definitions (7 interfaces) |
| `tailwind.config.ts` | Design system (colors, animations, typography) |
| `tsconfig.json` | Strict TypeScript, `@/*` path alias |
| `src/components/dashboard/` | Feature components (8 modules) |
| `src/components/ui/` | Shadcn/ui library (45 primitives) |
| `AGENTS.md` | Team guidelines (indentation, formatting, etc.) |

---

## Common Development Tasks

**Adding a new dashboard metric:**
1. Add calculation in `page.tsx`
2. Create `MetricCard` with icon + trend
3. Add to KPI grid in responsive layout

**Adding a new filter to DirectorySubmissions:**
1. Add state variable (`const [filterXyz, setFilterXyz] = useState()`)
2. Update filter logic in computed `filtered` array
3. Add UI control (Select or Input component)

**Creating a new data table:**
1. Use `Table` component from Shadcn/ui
2. Apply sticky header: `thead: 'sticky top-0 bg-background'`
3. Filter/sort using mock data or component state

**Integrating with Anthropic API:**
1. Replace mock `aiDescription` with API call
2. Update `aiStatus` to track generation state (`generating`, `generated`)
3. Store model reference in database
4. Add error handling for API failures

---

## Architecture Highlights

**Type Safety:** Full TypeScript strict mode with `@/*` path aliases
**Accessibility:** Radix UI primitives with ARIA roles/labels
**Responsive:** Mobile-first design (1-2-4 column progression)
**Theming:** HSL CSS variables + dark mode class strategy
**Modular:** Components accept props, no tightly coupled dependencies
**Deterministic:** Mock data provides consistent UI across sessions

---

## Known Limitations & Next Steps

**Not yet implemented:**
- Testing framework (Vitest/Playwright)
- ESLint configuration (linting rules)
- Error boundaries or error handling
- Loading states / skeletons
- Backend integration (Supabase, Anthropic)
- Toast notifications
- Form validation (react-hook-form installed but unused)

**Production readiness:**
- Add error boundaries for API failures
- Implement loading states
- Connect to real Supabase database
- Integrate Anthropic Claude API
- Add logging/monitoring (Vercel Analytics ready)
