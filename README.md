# Kasturi Reality Venture

A premium, full-featured real estate website built with modern web technologies, showcasing luxury properties with an elegant user experience and comprehensive property management features.

![Kasturi Realty Venture](public/KASTURI%20REAILTY%20VENTURE%202.jpg)

## Overview

Kasturi Realty Venture is a sophisticated real estate platform designed to showcase premium residential and commercial properties in Mumbai. The website features a modern, responsive design with smooth animations, interactive property galleries, and a comprehensive property filtering system. Built with performance and user experience in mind, it delivers a seamless browsing experience across all devices.

## Key Features

### Property Management
- **Dynamic Property Listings**: Browse through a curated collection of premium properties loaded from Supabase database
- **Advanced Filtering**: Filter properties by type, location, price range, and number of bedrooms
- **Featured Properties Carousel**: Auto-playing carousel showcasing premium properties with smooth transitions
- **Property Detail Modal**: Comprehensive property details with full-screen image galleries
- **Real-time Data**: Properties are dynamically loaded from Supabase with real-time updates

### User Interface
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Custom animations using CSS and React transitions including:
  - Slide animations (left, right, up)
  - Fade effects
  - Zoom animations
  - Floating elements
  - Ken Burns effect on hero images
- **Interactive Components**:
  - Animated counters showing business statistics
  - Testimonial slider with auto-play
  - Mobile-friendly navigation with hamburger menu
  - Floating feedback button

### Contact & Communication
- **WhatsApp Integration**: Direct WhatsApp messaging to +91 99877 39999
- **Email Integration**: Pre-filled email inquiries to kasturiventures99@gmail.com
- **Contact Form**: Floating label inputs with validation
- **Multiple Contact Points**: Phone, email, and physical address clearly displayed

### Feedback System
- **Customer Feedback**: Submit and view customer reviews and testimonials
- **Rating System**: 5-star rating system for property reviews
- **Feedback Modal**: Beautiful modal interface for submitting feedback
- **Feedback Viewer**: Browse all submitted feedback from customers

### Services Section
- **Luxury Residences**: Premium villas and apartments with world-class amenities
- **Commercial Spaces**: Strategic properties in prime business districts
- **Property Management**: Comprehensive property management services
- **Investment Advisory**: Expert guidance on real estate investments

## Tech Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe code for better maintainability
- **Vite 5.4.2**: Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for custom designs
- **Lucide React 0.344.0**: Beautiful, consistent icon library

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)**: Secure data access policies
- **RESTful API**: Type-safe API calls using Supabase JS client

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **TypeScript ESLint**: Type-aware linting
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

## Project Structure

```
kasturi-realty-venture/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── AnimatedCounter.tsx  # Animated number counter
│   │   ├── AnimatedSection.tsx  # Scroll-triggered animations
│   │   ├── FeedbackModal.tsx    # Customer feedback submission
│   │   ├── FeedbackViewer.tsx   # View all feedback
│   │   ├── FilterPanel.tsx      # Property filtering controls
│   │   ├── FloatingLabels.tsx   # Floating label form inputs
│   │   ├── PropertyCard.tsx     # Property listing card
│   │   ├── PropertyCarousel.tsx # Featured properties carousel
│   │   ├── PropertyDetailModal.tsx # Full property details
│   │   └── TestimonialSlider.tsx   # Client testimonials
│   ├── lib/
│   │   └── supabase.ts          # Supabase client & services
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles & animations
├── public/                      # Static assets & property images
├── supabase/
│   └── migrations/              # Database schema migrations
│       ├── 20251009042755_throbbing_hall.sql
│       ├── 20251009042802_odd_firefly.sql
│       ├── 20251009042808_broken_grass.sql
│       ├── 20251009042813_steep_shrine.sql
│       ├── 20251009042819_blue_silence.sql
│       ├── 20251009042828_muddy_lab.sql
│       ├── 20251009043239_turquoise_cottage.sql
│       ├── 20251012143511_create_feedback_table.sql
│       ├── 20251012144637_update_feedback_delete_policy.sql
│       └── 20251016120300_allow_public_property_inserts.sql
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Environment variables template
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite configuration
└── netlify.toml                 # Netlify deployment config
```

## Database Schema

### Tables

#### `properties`
Main table storing all property listings:
- `id` (uuid): Unique property identifier
- `title` (text): Property name/title
- `description` (text): Detailed property description
- `property_type` (text): Type (Residential/Commercial)
- `location` (text): Property location
- `price` (numeric): Property price
- `price_display` (text): Formatted price string
- `bedrooms` (integer): Number of bedrooms
- `bathrooms` (integer): Number of bathrooms
- `sqft` (numeric): Property size in square feet
- `area` (text): Alternative area measurement
- `images` (jsonb): Array of image filenames
- `featured` (boolean): Featured property flag
- `amenities` (jsonb): Array of amenities
- `created_at` (timestamp): Creation timestamp
- `updated_at` (timestamp): Last update timestamp

#### `feedbacks`
Customer feedback and reviews:
- `id` (uuid): Unique feedback identifier
- `name` (text): Customer name
- `email` (text): Customer email
- `rating` (integer): Rating (1-5)
- `message` (text): Feedback message
- `property_id` (uuid): Related property (optional)
- `created_at` (timestamp): Submission timestamp

#### `email_enquiries`
Contact form submissions:
- `id` (uuid): Unique enquiry identifier
- `sender_name` (text): Sender's name
- `sender_email` (text): Sender's email
- `subject` (text): Email subject
- `message` (text): Enquiry message
- `enquiry_source` (text): Source of enquiry
- `created_at` (timestamp): Submission timestamp

### Security
All tables are protected with Row Level Security (RLS) policies:
- Public read access for properties and feedback
- Controlled write access for data submission
- No unauthorized data deletion or modification

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- Supabase account (for database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/kasturi-realty-venture.git
cd kasturi-realty-venture
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

4. **Configure Supabase**
Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. **Run database migrations**
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run all migration files from `supabase/migrations/` in order

6. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build production-ready application to `dist/`
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript compiler for type checking

## Deployment

### Deploy to Netlify

**Option 1: Drag & Drop (Fastest)**
1. Build the project:
```bash
npm run build
```
2. Visit https://app.netlify.com/drop
3. Drag and drop the `dist` folder
4. Configure environment variables in Netlify dashboard
5. Get your live URL instantly!

**Option 2: Git Integration**
1. Push your code to GitHub
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

**Netlify Configuration** (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard
4. Your site is live!

## Environment Variables

Required environment variables (add to `.env`):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: Never commit `.env` file to version control. The `.env.example` file is provided as a template.

## Features in Detail

### Animation System
Custom CSS animations defined in `index.css`:
- `fadeIn` - Smooth fade-in effect
- `slideUp` - Slide from bottom with fade
- `slideLeft` / `slideRight` - Horizontal slide animations
- `zoomIn` - Scale and fade-in effect
- `float` - Floating/levitating effect
- `kenburns` - Cinematic zoom effect for images
- `gradient` - Animated gradient colors
- `glow` - Pulsing glow effect

### Component Architecture
- **Modular Design**: Each component has a single responsibility
- **Type Safety**: Full TypeScript types for props and state
- **Reusability**: Components are designed to be reused across the application
- **Performance**: Optimized rendering with React.memo and proper key usage

### Supabase Services
Custom service layer in `lib/supabase.ts`:
- `propertyService` - CRUD operations for properties
- `feedbackService` - Customer feedback management
- `emailEnquiryService` - Contact form submissions
- Type-safe API calls with proper error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- **Code Splitting**: Automatic code splitting by Vite
- **Lazy Loading**: Images load on demand
- **Optimized Images**: Proper image sizing and formats
- **Minimal Dependencies**: Only essential packages included
- **Tree Shaking**: Unused code eliminated in production build
- **CSS Purging**: Tailwind CSS purges unused styles

## Contact Information

**Kasturi Realty Venture**
- **Name**: Manoj Shrivastav
- **Phone**: +91 99877 39999
- **Email**: kasturiventures99@gmail.com
- **Address**:
  Vatsalya flat no. B-103, Sector no. 8,
  Charkop, Kandivali West,
  Mumbai 400067, India

**Office Hours**:
- Monday - Friday: 9:00 AM - 7:00 PM
- Saturday: 10:00 AM - 5:00 PM
- Sunday: By Appointment

## Business Information

- **Established**: 2019
- **Properties Sold**: 500+
- **Years of Experience**: 5+
- **Client Satisfaction**: 100%
- **Specialization**: Premium residential and commercial properties in Mumbai

## Contributing

This is a private project for Kasturi Realty Venture. For inquiries or suggestions, please contact through the channels mentioned above.

## License

Private - All Rights Reserved © 2024 Kasturi Realty Venture

## Troubleshooting

### Common Issues

**Images not loading**:
- Ensure images are in the `public/` folder
- Check image paths in database match filenames
- Verify file extensions are correct

**Build fails**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`
- Verify all environment variables are set

**Database connection issues**:
- Verify Supabase URL and key in `.env`
- Check Supabase project is active
- Ensure RLS policies are correctly set

**Deployment issues**:
- Ensure environment variables are set in hosting platform
- Check build logs for errors
- Verify build command produces `dist/` folder

## Version History

- **v1.0.0** (2024) - Initial release with full property management system

## Acknowledgments

- Design inspiration from modern real estate platforms
- Icons provided by Lucide React
- Database and backend powered by Supabase
- Built with React and Vite for optimal performance

---

**Built with ❤️ for Kasturi Realty Venture**
