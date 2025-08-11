# The Peck — Cafe Menu

A modern, responsive cafe menu application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Desktop sidebar navigation with mobile tab navigation
- **Menu Management**: Organized by sections with item cards
- **Search & Filtering**: Search by name/description, filter by dietary preferences
- **Shopping Cart**: Add items with variants and add-ons, persistent storage
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
- **Performance**: React Query for data fetching and caching

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-peck-menu
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/menu/         # API routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main menu page
│   └── providers.tsx     # React Query provider
├── components/            # React components
│   ├── CartDrawer.tsx    # Shopping cart drawer
│   ├── Filters.tsx       # Filter controls
│   ├── MenuItemCard.tsx  # Individual menu item
│   └── SectionNav.tsx    # Section navigation
├── hooks/                 # Custom React hooks
│   └── useSectionInView.ts # Intersection observer hook
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── cart.ts           # Cart store (Zustand)
│   └── money.ts          # Money formatting utilities
└── types/                 # TypeScript type definitions
    └── menu.ts           # Menu-related types
```

## Customization

### Adding New Dietary Tags

1. Update the `FilterType` in `src/types/menu.ts`:
```typescript
export type FilterType = 'vegetarian' | 'gluten_free' | 'beverages' | 'mains' | 'vegan' | 'nut_free';
```

2. Add the filter label in `src/components/Filters.tsx`:
```typescript
const filterLabels: Record<FilterType, string> = {
  // ... existing filters
  vegan: 'Vegan',
  nut_free: 'Nut-free',
};
```

3. Update the filtering logic in `src/app/page.tsx`:
```typescript
case 'vegan':
  return item.dietary_tags?.includes('vegan');
case 'nut_free':
  return item.dietary_tags?.includes('nut_free');
```

### Adding New Menu Sections

1. Add the section to your API response in `src/app/api/menu/route.ts`
2. The UI will automatically render new sections
3. Update filtering logic if needed for section-based filters

### Styling Customization

- Modify `src/app/globals.css` for global styles
- Use Tailwind classes in components for component-specific styling
- Create custom CSS variables in `globals.css` for consistent theming

## Testing

Run tests with:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

Or deploy to Vercel, Netlify, or your preferred hosting platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
