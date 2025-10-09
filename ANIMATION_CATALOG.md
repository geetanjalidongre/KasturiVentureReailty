# Kasturi Reality Venture - Complete Animation Catalog

## 🎬 CSS Keyframe Animations (src/index.css)

### Hero Section Entrance Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

### Animation Classes Applied:
- `.hero-section` - fadeIn 1s ease-out
- `.hero-title` - fadeSlideIn 1s ease-out 0.2s forwards
- `.hero-subtitle` - fadeSlideIn 1s ease-out 0.4s forwards  
- `.hero-buttons` - fadeSlideIn 1s ease-out 0.6s forwards
- `.hero-stats` - fadeSlideIn 1s ease-out 0.8s forwards
- `.hero-image` - fadeSlideInRight 1s ease-out 0.4s forwards
- `.price-badge` - bounce 2s infinite
- `.cta-pulse` - pulse 2s infinite

## 🔄 Scroll-Triggered Animations

### Base Animation System:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### JavaScript Implementation (AnimatedSection.tsx):
- Uses IntersectionObserver API
- Supports multiple animation types: fadeUp, fadeIn, slideLeft, slideRight, scale
- Configurable delays for staggered effects
- Threshold: 0.1 (triggers when 10% visible)

## 🎠 Carousel/Slider Animations

### Property Carousel (PropertyCarousel.tsx):
```css
.carousel-slide {
  transition: all 0.5s ease-in-out;
}
```
- Auto-rotation every 5 seconds
- Smooth slide transitions with opacity and transform
- Navigation arrows with hover scale effects
- Dot indicators with scale animations

### Testimonial Slider (TestimonialSlider.tsx):
```css
.testimonial {
  opacity: 0;
  transition: opacity 1s ease;
}
.testimonial.active {
  opacity: 1;
}
```
- Fade transitions between testimonials
- 6-second auto-rotation
- Navigation controls with hover effects

## 🃏 Property Card Animations

### Hover Effects:
```css
.property-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.property-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```

### Image Zoom on Hover:
- Images scale to 110% on card hover
- Overlay gradients fade in/out
- Color transitions for titles

## 📱 Interactive Form Animations

### Floating Labels (FloatingLabels.tsx):
```css
input:focus + label,
input:not(:placeholder-shown) + label {
  transform: translateY(-20px);
  font-size: 0.8em;
  color: #kasturi-gold;
  transition: 0.3s ease;
}
```

### Focus Effects:
```css
.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}
```

## 🎛️ Filter Panel Animations

### Expandable Interface:
```css
.filter-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.filter-panel.open {
  max-height: 500px;
}
```

### Chevron Rotation:
- 180-degree rotation on expand/collapse
- Smooth transition duration: 300ms

## 📊 Counter Animations (AnimatedCounter.tsx)

### JavaScript-Powered Counting:
- Uses requestAnimationFrame for smooth counting
- IntersectionObserver triggers when 50% visible
- Configurable duration (default: 2000ms)
- Supports suffixes (+ symbols, etc.)

## 🎯 Button & CTA Animations

### Hover Effects:
- Scale transforms (1.05x on hover)
- Color transitions
- Shadow depth changes
- Active state scale-down (0.95x)

### Pulse Animation for CTAs:
- Continuous 2-second pulse cycle
- Subtle scale animation (1.02x max)

## 🌟 Advanced Animation Features

### Staggered Entrance:
- Property cards animate with 0.1s delays
- Service cards with 0.15s delays
- Creates cinematic reveal effect

### Parallax-Style Effects:
- Hero image transforms on scroll
- Background gradients with opacity changes
- Layered animation timing

## ♿ Accessibility Features

### Reduced Motion Support:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🔧 Animation Libraries Used

### React Components:
- Custom IntersectionObserver implementation
- React hooks for state management
- TypeScript for type safety

### CSS Techniques:
- CSS Grid and Flexbox for layout animations
- Transform and opacity for performance
- Cubic-bezier easing functions
- CSS custom properties for theming

## 📱 Mobile Optimization

### Responsive Animations:
- Touch-friendly hover states
- Reduced animation complexity on mobile
- Optimized for 60fps performance
- Battery-conscious animation timing

## 🎨 Brand-Consistent Animations

### Kasturi Gold Theme:
- Color transitions use brand colors
- Timing matches luxury brand feel
- Smooth, premium animation curves
- Consistent 300-500ms durations for interactions

---

## 🔍 How to Inspect These Animations:

1. **Chrome DevTools → Animations Panel**: Shows all running animations
2. **Elements Tab**: Watch classes being added/removed on scroll
3. **Performance Tab**: Profile animation performance
4. **Network Tab**: See CSS/JS files loading animations
5. **Console**: Log animation events for debugging

All animations are production-ready, accessible, and optimized for performance across devices.