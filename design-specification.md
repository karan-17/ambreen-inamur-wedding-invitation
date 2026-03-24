# Wedding Invitation Card - Design Specification
## Ambreen & Inaur's Wedding Website

## Overview
Elegant animated wedding invitation website featuring a sophisticated pista color palette with scroll-based animations, modern typography, and cultural Islamic elements. The design celebrates the union of Ambreen Aftab and Inaur Rahman with a multi-day celebration from April 20-23, 2026.

## 1. Color Palette - Pista Theme

### Primary Colors
```css
:root {
  /* Primary Pista Colors */
  --pista-primary: #B8C5A6;        /* Main pista green */
  --pista-light: #D4E0C7;          /* Light pista green */
  --pista-dark: #9CAA8A;           /* Darker pista green */
  
  /* Complementary Beiges & Creams */
  --cream-primary: #F5F2E9;        /* Warm cream */
  --beige-light: #F0EDE4;          /* Light beige */
  --beige-medium: #E8E2D5;         /* Medium beige */
  --beige-dark: #D4CFC0;           /* Darker beige */
  
  /* Accent Colors */
  --gold-accent: #D4AF37;          /* Elegant gold */
  --gold-light: #E8C868;           /* Light gold */
  --gold-dark: #B8941F;            /* Darker gold */
  --sage-green: #9CAF88;           /* Sage green */
  --dusty-rose: #D4B5A0;           /* Subtle dusty rose */
  --islamic-green: #228B22;        /* Traditional Islamic green */
  --pearl-white: #FEFEFE;          /* Pure pearl white */
  
  /* Text Colors */
  --text-primary: #3A3A3A;         /* Dark charcoal */
  --text-secondary: #6B6B6B;       /* Medium gray */
  --text-light: #8B8B8B;           /* Light gray */
  --text-on-dark: #FFFFFF;         /* White on dark */
  
  /* Utility Colors */
  --shadow-light: rgba(184, 197, 166, 0.2);
  --shadow-medium: rgba(156, 170, 138, 0.3);
  --overlay-light: rgba(245, 242, 233, 0.9);
  --overlay-dark: rgba(60, 60, 60, 0.7);
}
```

## 2. Typography System

### Font Stack
```css
/* Primary Font - Elegant Serif */
--font-primary: 'Playfair Display', 'Georgia', serif;

/* Secondary Font - Modern Sans */
--font-secondary: 'Poppins', 'Arial', sans-serif;

/* Script Font - Elegant Script */
--font-script: 'Dancing Script', 'Great Vibes', cursive;

/* Arabic/Urdu Font - For Islamic Text */
--font-arabic: 'Amiri', 'Traditional Arabic', serif;

/* Decorative Font - For Special Text */
--font-decorative: 'Cormorant Garamond', 'Georgia', serif;

/* Monospace - For dates/times */
--font-mono: 'Source Code Pro', 'Courier New', monospace;
```

### Typography Scale
```css
/* Heading Styles */
--font-size-h1: 3.5rem;    /* Hero title */
--font-size-h2: 2.5rem;    /* Section headers */
--font-size-h3: 2rem;      /* Sub-headers */
--font-size-h4: 1.5rem;    /* Card titles */
--font-size-h5: 1.25rem;   /* Small headers */

/* Body Text */
--font-size-body-lg: 1.125rem;  /* Large body */
--font-size-body: 1rem;         /* Regular body */
--font-size-body-sm: 0.875rem;  /* Small body */
--font-size-caption: 0.75rem;   /* Captions */

/* Font Weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 3. Layout Structure & Wireframe

### Page Sections (Top to Bottom)

#### 3.1 Hero Section
```
┌─────────────────────────────────────────┐
│              HERO SECTION               │
│  ┌─────────────────────────────────┐   │
│  │      Animated Background        │   │
│  │   (Islamic geometric pattern)   │   │
│  │          ☪ Bismillah           │   │
│  │                                 │   │
│  │          Ambreen                │   │
│  │            &                    │   │
│  │          Inaur                  │   │
│  │      (Dancing Script Font)      │   │
│  │                                 │   │
│  │   "And We created you in pairs" │   │
│  │        -Quran 78:8              │   │
│  │                                 │   │
│  │   Wednesday, 22nd April 2026    │   │
│  │      ↓ Scroll Animation         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### 3.2 Welcome Message
```
┌─────────────────────────────────────────┐
│            WELCOME MESSAGE              │
│                                         │
│    "Together with our families"         │
│                                         │
│         [Couple Photo]                  │
│                                         │
│    Personal welcome message text        │
│                                         │
└─────────────────────────────────────────┘
```

#### 3.3 Event Timeline - Auspicious Moments
```
┌─────────────────────────────────────────┐
│           CELEBRATION TIMELINE          │
│                                         │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │    HALDI    │  │     MEHNDI      │  │
│  │ April 20    │  │   April 21      │  │
│  │  4:00 PM    │  │    6:00 PM      │  │
│  │             │  │ (At Residence)  │  │
│  └─────────────┘  └─────────────────┘  │
│                                         │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   NIKAH     │  │    RUKHSATI     │  │
│  │ April 22    │  │   April 23      │  │
│  │  8:30 PM    │  │   12:00 PM      │  │
│  │ Marriage    │  │   Farewell      │  │
│  │   House     │  │   Ceremony      │  │
│  └─────────────┘  └─────────────────┘  │
│                                         │
│         PUJA SHREE MARRIAGE HOUSE       │
│       Near Shiv Mandir, Bariatu        │
│         Ranchi, Jharkhand              │
└─────────────────────────────────────────┘
```

#### 3.4 Countdown Timer
```
┌─────────────────────────────────────────┐
│            COUNTDOWN TIMER              │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────┐   │
│  │ XX  │ │ XX  │ │ XX  │ │   XX    │   │
│  │DAYS │ │HOURS│ │MINS │ │SECONDS  │   │
│  └─────┘ └─────┘ └─────┘ └─────────┘   │
│                                         │
│         "Until our special day"         │
└─────────────────────────────────────────┘
```

#### 3.5 Our Story
```
┌─────────────────────────────────────────┐
│              OUR STORY                  │
│                                         │
│    ┌───────────────────────────────┐    │
│    │        Timeline Cards         │    │
│    │                               │    │
│    │  ○ First Met - Date/Story     │    │
│    │  ○ First Date - Date/Story    │    │
│    │  ○ Engagement - Date/Story    │    │
│    │  ○ Wedding Day - Date         │    │
│    └───────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 3.6 Photo Gallery
```
┌─────────────────────────────────────────┐
│             PHOTO GALLERY               │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────┐   │
│  │     │ │     │ │     │ │         │   │
│  │ IMG │ │ IMG │ │ IMG │ │   IMG   │   │
│  │     │ │     │ │     │ │         │   │
│  └─────┘ └─────┘ └─────┘ └─────────┘   │
│                                         │
│       (Masonry/Grid Layout)             │
└─────────────────────────────────────────┘
```

#### 3.7 RSVP Section
```
┌─────────────────────────────────────────┐
│               RSVP FORM                 │
│                                         │
│    "Please respond by [Date]"           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      Name: [Input Field]        │   │
│  │      Email: [Input Field]       │   │
│  │      Attendance: [Radio]        │   │
│  │      ○ Yes  ○ No               │   │
│  │      Guests: [Number]           │   │
│  │      Message: [Textarea]        │   │
│  │                                 │   │
│  │      [Submit Button]            │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### 3.8 Location & Travel
```
┌─────────────────────────────────────────┐
│           LOCATION & TRAVEL             │
│                                         │
│  ┌─────────────────┐ ┌─────────────┐   │
│  │   Embedded Map  │ │   Travel    │   │
│  │                 │ │   Info      │   │
│  │   [Google Map]  │ │             │   │
│  │                 │ │ Hotels      │   │
│  │                 │ │ Transport   │   │
│  └─────────────────┘ └─────────────┘   │
└─────────────────────────────────────────┘
```

#### 3.9 Footer
```
┌─────────────────────────────────────────┐
│                FOOTER                   │
│                                         │
│         "With love and gratitude"       │
│                                         │
│           [Couple Names]                │
│                                         │
│    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│    │  IG │ │  FB │ │ TWR │ │EMAIL│    │
│    └─────┘ └─────┘ └─────┘ └─────┘    │
└─────────────────────────────────────────┘
```

## 4. Animation Flow & User Journey

### 4.1 Page Load Animations
```css
/* Loading Sequence */
1. Hero background fade-in (0.8s ease)
2. Couple names slide-up (1.2s ease-out, delay: 0.3s)
3. Subtitle fade-in (0.6s ease, delay: 0.8s)
4. Scroll indicator bounce (infinite, delay: 1.5s)
```

### 4.2 Scroll-Triggered Animations
```css
/* Intersection Observer Triggers */
.fade-in-up {
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.8s ease-out;
}

.fade-in-up.visible {
  transform: translateY(0);
  opacity: 1;
}

.slide-in-left {
  transform: translateX(-50px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

.slide-in-right {
  transform: translateX(50px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

.scale-in {
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.7s ease-out;
}
```

### 4.3 Micro-Interactions
- Button hover: Scale 1.05, shadow increase
- Card hover: Lift effect with shadow
- Form focus: Border color change, gentle glow
- Image hover: Slight zoom (1.1x)
- Countdown numbers: Pulse animation on change

### 4.4 User Journey Flow
1. **Landing** → Hero impact with names
2. **Engagement** → Scroll to reveal story
3. **Information** → Event details and countdown
4. **Connection** → Photo gallery and story
5. **Action** → RSVP form completion
6. **Practical** → Location and travel info
7. **Farewell** → Footer with contact info

## 5. Component Design Specifications

### 5.1 Cards
```css
.card {
  background: var(--cream-primary);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px var(--shadow-light);
  border: 1px solid var(--beige-medium);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px var(--shadow-medium);
}
```

### 5.2 Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, var(--pista-primary), var(--pista-dark));
  color: var(--text-on-dark);
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  font-weight: var(--font-weight-medium);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--shadow-medium);
}

.btn-secondary {
  background: transparent;
  color: var(--pista-dark);
  border: 2px solid var(--pista-primary);
  padding: 14px 30px;
  border-radius: 50px;
}
```

### 5.3 Form Elements
```css
.form-input {
  background: var(--cream-primary);
  border: 2px solid var(--beige-medium);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: var(--font-size-body);
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: var(--pista-primary);
  box-shadow: 0 0 0 4px rgba(184, 197, 166, 0.1);
  outline: none;
}
```

## 6. Responsive Breakpoints

### 6.1 Breakpoint System
```css
/* Mobile First Approach */
:root {
  --breakpoint-xs: 320px;   /* Small phones */
  --breakpoint-sm: 576px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 992px;   /* Small laptops */
  --breakpoint-xl: 1200px;  /* Desktop */
  --breakpoint-xxl: 1400px; /* Large desktop */
}
```

### 6.2 Layout Adjustments

#### Mobile (320px - 575px)
- Single column layout
- Hero text: 2.5rem
- Card padding: 1.5rem
- Button padding: 12px 24px
- Countdown: 2x2 grid

#### Tablet (576px - 767px)
- Hero text: 3rem
- Two-column event details
- Card padding: 2rem
- Photo gallery: 2 columns

#### Laptop (768px - 991px)
- Hero text: 3.5rem
- Three-column layouts
- Full navigation
- Photo gallery: 3 columns

#### Desktop (992px+)
- Full hero section
- Four-column layouts where applicable
- Maximum content width: 1200px
- Photo gallery: 4 columns

### 6.3 Typography Scaling
```css
/* Responsive Typography */
@media (max-width: 575px) {
  :root {
    --font-size-h1: 2.5rem;
    --font-size-h2: 2rem;
    --font-size-h3: 1.5rem;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  :root {
    --font-size-h1: 3rem;
    --font-size-h2: 2.25rem;
    --font-size-h3: 1.75rem;
  }
}
```

## 7. Performance Considerations

### 7.1 Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Responsive images with srcset
- Compress images to 85% quality

### 7.2 Animation Performance
- Use transform and opacity for animations
- Implement `will-change` property carefully
- Use CSS custom properties for theme switching
- Debounce scroll events

### 7.3 Loading Strategy
- Critical CSS inline
- Progressive enhancement
- Preload hero background
- Defer non-critical scripts

## 8. Accessibility Features

### 8.1 Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1
- Form states clearly distinguishable

### 8.2 Navigation
- Keyboard navigation support
- Skip to content links
- Aria labels for interactive elements
- Screen reader friendly content

### 8.3 Motion
- Respect prefers-reduced-motion
- Provide animation toggle
- Ensure content accessible without animations

## 9. Technical Implementation Notes

### 9.1 CSS Architecture
```
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── layout/
│   ├── grid.css
│   ├── sections.css
│   └── responsive.css
└── animations/
    ├── keyframes.css
    ├── transitions.css
    └── scroll-animations.css
```

### 9.2 JavaScript Features
- Intersection Observer for scroll animations
- Countdown timer functionality
- Form validation and submission
- Smooth scrolling navigation
- Image lazy loading
- Progressive web app features

## 10. Cultural & Islamic Design Elements

### 10.1 Islamic Patterns & Motifs
```css
/* Geometric Patterns */
.islamic-pattern {
  background: radial-gradient(circle at 25% 25%, var(--gold-accent) 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 75%, var(--pista-light) 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  opacity: 0.1;
}

/* Arabesque Borders */
.arabesque-border {
  border-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0,10 Q25,0 50,10 T100,10" stroke="%23D4AF37" fill="none"/></svg>') 1;
}

/* Crescent and Star Elements */
.islamic-symbol {
  position: relative;
}

.islamic-symbol::before {
  content: '☪';
  color: var(--gold-accent);
  font-size: 1.5rem;
  opacity: 0.7;
}
```

### 10.2 Bismillah Calligraphy
```css
.bismillah {
  font-family: var(--font-arabic);
  font-size: 1.2rem;
  text-align: center;
  color: var(--islamic-green);
  margin-bottom: 2rem;
  letter-spacing: 2px;
  direction: rtl;
}

.bismillah-english {
  font-family: var(--font-decorative);
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
```

### 10.3 Quran Verse Styling
```css
.quran-verse {
  font-family: var(--font-decorative);
  font-style: italic;
  text-align: center;
  color: var(--islamic-green);
  font-size: 1.1rem;
  line-height: 1.6;
  padding: 1rem 2rem;
  border-top: 2px solid var(--gold-accent);
  border-bottom: 2px solid var(--gold-accent);
  margin: 2rem 0;
  background: linear-gradient(135deg, 
              rgba(245, 242, 233, 0.8), 
              rgba(184, 197, 166, 0.1));
}

.verse-reference {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  font-weight: var(--font-weight-medium);
}
```

## 11. Enhanced Animation Specifications

### 11.1 Islamic-Inspired Animations
```css
/* Mosque Dome Reveal Animation */
@keyframes domeReveal {
  0% {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

/* Geometric Pattern Growth */
@keyframes geometricGrow {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1) rotate(45deg);
    opacity: 0.1;
  }
}

/* Crescent Rotation */
@keyframes crescentRotate {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

/* Arabic Text Flow */
@keyframes arabicFlow {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 11.2 Enhanced Scroll Animations
```css
/* Parallax Islamic Patterns */
.parallax-pattern {
  transform: translateY(calc(var(--scroll) * 0.5px));
  will-change: transform;
}

/* Verse Reveal Animation */
.verse-reveal {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 1s ease-out;
}

.verse-reveal.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Timeline Card Stagger */
.timeline-card {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease-out;
}

.timeline-card:nth-child(2) { transition-delay: 0.2s; }
.timeline-card:nth-child(3) { transition-delay: 0.4s; }
.timeline-card:nth-child(4) { transition-delay: 0.6s; }
```

### 11.3 Interactive Hover Effects
```css
/* Henna Pattern Reveal on Hover */
.mehndi-card:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/patterns/henna-pattern.svg') center/cover;
  opacity: 0.1;
  animation: hennaReveal 0.8s ease-out;
}

@keyframes hennaReveal {
  0% { opacity: 0; transform: scale(1.1); }
  100% { opacity: 0.1; transform: scale(1); }
}

/* Gold Accent Shimmer */
.gold-shimmer {
  position: relative;
  overflow: hidden;
}

.gold-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
              transparent, 
              rgba(212, 175, 55, 0.3), 
              transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

## 12. Advanced Responsive Design

### 12.1 Container Queries (Modern Approach)
```css
/* Container-based responsive design */
@container (min-width: 768px) {
  .event-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@container (min-width: 1024px) {
  .timeline-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
```

### 12.2 Arabic Text Responsiveness
```css
/* Right-to-left text handling */
[dir="rtl"] .arabic-content {
  text-align: right;
  direction: rtl;
}

/* Responsive Arabic font sizes */
@media (max-width: 575px) {
  .bismillah {
    font-size: 1rem;
    line-height: 1.8;
  }
  
  .quran-verse {
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
  }
}
```

## 13. Accessibility Enhancements

### 13.1 Cultural Accessibility
```css
/* High contrast mode for Islamic elements */
@media (prefers-contrast: high) {
  .islamic-symbol {
    color: var(--islamic-green);
    font-weight: bold;
  }
  
  .gold-accent {
    color: #8B4513; /* More contrasted gold */
  }
}

/* Reduced motion for religious elements */
@media (prefers-reduced-motion: reduce) {
  .crescentRotate,
  .geometricGrow,
  .arabicFlow {
    animation: none;
  }
  
  .parallax-pattern {
    transform: none;
  }
}
```

### 13.2 Screen Reader Optimization
```html
<!-- Semantic markup for Islamic content -->
<section aria-label="Islamic blessing and Quran verse">
  <div class="bismillah" aria-label="Bismillah - In the name of Allah">
    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
  </div>
  
  <blockquote class="quran-verse" cite="Quran 78:8">
    <p>"And We created you in pairs"</p>
    <cite class="verse-reference">- Quran 78:8</cite>
  </blockquote>
</section>
```

This comprehensive design specification provides the foundation for creating an elegant, culturally respectful, and technically advanced wedding invitation website that honors Islamic traditions while embracing modern web design principles.