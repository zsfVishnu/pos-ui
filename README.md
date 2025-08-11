# The Peck — Cafe Menu

A modern, responsive restaurant website for a cafe built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Hero & About**: Prominent hero section with cafe branding and compelling about section
- **Reviews System**: Customer review summary with accessible carousel component
- **Smart Discovery**: Three curated sections (Trending, Spicy Picks, Most Popular) with intelligent filtering
- **Responsive Design**: Desktop sidebar navigation with mobile tab navigation
- **Menu Management**: Organized by sections with item cards
- **Search & Filtering**: Search by name/description, filter by dietary preferences
- **Shopping Cart**: Add items with variants and add-ons, persistent storage
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
- **Performance**: React Query for data fetching and caching
- **Toast Notifications**: User feedback for cart actions

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Data Integration

The application currently uses mock data for demonstration. To integrate with real data sources:

### 1. Replace Mock Data

Edit `src/lib/mockData.ts` to connect to your data sources:

```typescript
// Replace with your API endpoints
export const cafeSummary = await fetch('/api/cafe-info').then(r => r.json());
export const reviews = await fetch('/api/reviews').then(r => r.json());
export const enhancedMenuData = await fetch('/api/menu').then(r => r.json());
```

### 2. Review Data Sources

Connect to review platforms:
- **Google Reviews**: Use Google Places API
- **Yelp**: Use Yelp Fusion API  
- **TripAdvisor**: Use TripAdvisor Content API

### 3. Menu Data

Structure your menu JSON according to the `MenuResponse` interface in `src/types/menu.ts`. Key fields:
- `tags`: Use for discovery sections (trending, spicy, popular)
- `spiceLevel`: 1-5 scale for spice indicators
- `dietaryTags`: For filtering (vegetarian, vegan, gluten_free)
- `image`: URLs to item photos

### 4. Images

Replace placeholder Pexels URLs with your own:
- Hero image in `cafeSummary.heroImage`
- Menu item images in `item.image`
- Use a CDN for optimal performance

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
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── ReviewSummary.tsx # Review summary
│   ├── ReviewCarousel.tsx# Review carousel
│   ├── DiscoverySection.tsx # Discovery sections
│   ├── MenuFilters.tsx   # Advanced filtering
│   ├── MenuGrid.tsx      # Menu item grid
│   ├── CartDrawer.tsx    # Shopping cart drawer
│   ├── MenuItemCard.tsx  # Individual menu item
│   └── Toast.tsx         # Toast notifications
├── hooks/                 # Custom React hooks
│   ├── useSectionInView.ts # Intersection observer hook
│   └── useToast.ts       # Toast notification hook
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── cart.ts           # Cart store (Zustand)
│   ├── money.ts          # Money formatting utilities
│   └── mockData.ts       # Mock data for demo
└── types/                 # TypeScript type definitions
    └── menu.ts           # Menu-related types
```

## Key Components

### Hero & About
- Responsive hero with background image and call-to-action
- About section with cafe story and feature highlights

### Review System
- Aggregate review summary with star ratings
- Accessible carousel with autoplay and manual controls
- Support for multiple review sources (Google, Yelp, TripAdvisor)

### Discovery Sections
- **Trending Now**: Items marked with `isTrending: true`
- **Spicy Picks**: Items with `spiceLevel > 0`
- **Most Popular**: Items marked with `isPopular: true`
- Each section links to filtered menu view

### Advanced Menu Filtering
- Search by name/description
- Filter by category, dietary preferences, spice level, price range
- Sort by popularity, price, newest
- Real-time filtering with URL state management

### Enhanced Cart
- Persistent storage with localStorage
- Line item management with variants and add-ons
- Tax calculation and subtotal breakdown
- Toast notifications for user feedback

## Customization

### Adding New Menu Categories

1. Add items with the new category in your menu data
2. The UI will automatically detect and display the new category

### Adding New Dietary Filters

1. Update the dietary options in `src/components/MenuFilters.tsx`:
```typescript
{['vegetarian', 'vegan', 'gluten_free', 'nut_free'].map(dietary => (
  // Filter button
))}
```

2. Ensure your menu items include the corresponding `dietaryTags`

### Customizing Discovery Sections

Modify the logic in `src/app/page.tsx`:

```typescript
// Add new discovery section
const healthyItems = useMemo(() => 
  allItems.filter(item => item.tags?.includes('healthy')), [allItems]
);
```

### Styling Customization

The design uses a warm, cafe-appropriate color palette:
- Primary: Amber (amber-600, amber-700)
- Success: Green tones
- Error: Red tones
- Neutral: Gray scale

Modify colors in Tailwind classes or add CSS variables in `src/app/globals.css`.

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus management

## Performance Optimizations

- Image lazy loading
- Component code splitting
- Efficient re-rendering with useMemo
- Optimized bundle size
- Responsive images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Integration Examples

### Google Reviews Integration

```typescript
const fetchGoogleReviews = async (placeId: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`
  );
  return response.json();
};
```

### Menu Management System Integration

```typescript
const fetchMenuData = async () => {
  const response = await fetch('/api/menu', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## Deployment Considerations

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
GOOGLE_PLACES_API_KEY=your_key_here
YELP_API_KEY=your_key_here
```

### Production Optimizations

1. Enable image optimization in `next.config.js`
2. Configure CDN for static assets
3. Set up proper caching headers
4. Enable compression
5. Monitor Core Web Vitals

### SEO Optimization

The application includes:
- Semantic HTML structure
- Meta tags in layout
- Structured data for local business
- Optimized images with alt text
- Fast loading times

## Testing

Run tests with:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

Tests cover:
- Component rendering
- User interactions
- Cart functionality
- Utility functions
- Accessibility compliance

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

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs and CORS settings
2. **Cart not persisting**: Verify localStorage is enabled
3. **Filters not working**: Check data structure matches TypeScript interfaces
4. **Reviews not displaying**: Verify review data format

### Debug Mode

Enable debug logging by setting:
```typescript
const DEBUG = process.env.NODE_ENV === 'development';
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Roadmap

- [ ] Online ordering integration
- [ ] Table reservation system
- [ ] Loyalty program
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App features
- [ ] Real-time inventory updates

## License

This project is licensed under the MIT License.
