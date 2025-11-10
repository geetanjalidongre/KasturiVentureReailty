# Kasturi Realty Venture

A modern, responsive real estate website showcasing premium properties with detailed listings, image galleries, and interactive features.

## Features

- **Property Listings**: Browse through curated real estate properties with detailed information
- **Interactive Modals**: View comprehensive property details with image carousels
- **Filter & Search**: Filter properties by type, location, and price range
- **Testimonials**: Customer feedback and reviews
- **Feedback System**: Submit and view customer feedback
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Modern UI with engaging transitions and effects

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify/Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/kasturi-realty-venture.git
cd kasturi-realty-venture
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
kasturi-realty-venture/
├── src/
│   ├── components/        # React components
│   ├── lib/              # Utility functions and Supabase client
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets (images)
├── supabase/
│   └── migrations/       # Database migrations
├── dist/                 # Production build (generated)
└── package.json          # Project dependencies
```

## Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
   - Visit https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Get your live URL instantly

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Database Setup

The project uses Supabase for data persistence. Database migrations are located in `supabase/migrations/`.

### Tables:
- `properties` - Property listings with details, images, and pricing
- `feedbacks` - Customer feedback and reviews

## Contact

**Kasturi Realty Venture**
- Email: kasturiventures99@gmail.com
- Website: [Coming Soon]

## License

Private - All Rights Reserved
