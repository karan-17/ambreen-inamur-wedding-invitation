# Implementation Guide - Ambreen & Inaur Wedding Website
## React/Next.js Architecture & Component Structure

## 1. Project Structure
```
wedding-invitation/
├── public/
│   ├── fonts/
│   │   ├── Amiri-Regular.woff2           # Arabic font
│   │   ├── DancingScript-Bold.woff2      # Script font
│   │   ├── PlayfairDisplay-Regular.woff2 # Serif font
│   │   └── Poppins-Regular.woff2         # Sans font
│   ├── images/
│   │   ├── hero-bg.webp                  # Hero background
│   │   ├── couple-photo.webp             # Main couple photo
│   │   ├── patterns/
│   │   │   ├── islamic-geometric.svg     # Islamic patterns
│   │   │   ├── henna-pattern.svg         # Henna designs
│   │   │   └── arabesque-border.svg      # Decorative borders
│   │   └── gallery/                      # Photo gallery images
│   └── icons/
│       ├── crescent.svg                  # Islamic symbol
│       └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                          # Reusable UI components
│   │   ├── sections/                    # Page sections
│   │   ├── animations/                  # Animation components
│   │   └── layout/                      # Layout components
│   ├── hooks/                           # Custom React hooks
│   ├── styles/                          # Global styles
│   ├── utils/                           # Utility functions
│   └── data/                           # Static data
└── pages/                              # Next.js pages
```

## 2. Component Architecture

### 2.1 Main Layout Component
```typescript
// src/components/layout/Layout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { scrollY } = useScrollAnimation();
  
  return (
    <div className="layout">
      {/* Animated background patterns */}
      <div 
        className="islamic-pattern parallax-pattern"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      {/* Main content */}
      <main className="main-content">
        {children}
      </main>
      
      {/* Loading screen */}
      <LoadingScreen />
    </div>
  );
};
```

### 2.2 Hero Section Component
```typescript
// src/components/sections/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';

export const HeroSection: React.FC = () => {
  const weddingDate = new Date('2026-04-22T20:30:00');
  const countdown = useCountdown(weddingDate);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      {/* Bismillah */}
      <motion.div 
        className="bismillah islamic-symbol"
        variants={heroVariants}
      >
        <div className="arabic-text" dir="rtl">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <div className="bismillah-english">
          In the name of Allah, the Most Gracious, the Most Merciful
        </div>
      </motion.div>

      {/* Couple Names */}
      <motion.div className="couple-names" variants={heroVariants}>
        <h1 className="bride-name">Ambreen</h1>
        <div className="wedding-symbol">
          <span className="lotus-symbol">🪷</span>
          <span className="ampersand">&</span>
        </div>
        <h1 className="groom-name">Inaur</h1>
      </motion.div>

      {/* Quran Verse */}
      <motion.blockquote 
        className="quran-verse verse-reveal"
        variants={heroVariants}
        cite="Quran 78:8"
      >
        <p>"And We created you in pairs"</p>
        <cite className="verse-reference">- Quran 78:8</cite>
      </motion.blockquote>

      {/* Wedding Date */}
      <motion.div className="wedding-date" variants={heroVariants}>
        <time dateTime="2026-04-22">Wednesday, 22nd April 2026</time>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>↓ Scroll to explore our journey</span>
      </motion.div>
    </motion.section>
  );
};
```

### 2.3 Event Timeline Component
```typescript
// src/components/sections/EventTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description?: string;
  location?: string;
  icon: string;
}

const events: Event[] = [
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    date: 'Monday, 20th April 2026',
    time: '4:00 PM',
    description: 'Traditional turmeric ceremony',
    icon: '🌻'
  },
  {
    id: 'mehndi',
    name: 'Mehndi Night',
    date: 'Tuesday, 21st April 2026',
    time: '6:00 PM',
    description: 'Henna ceremony at residence',
    location: 'At Our Residence',
    icon: '🤲'
  },
  {
    id: 'nikah',
    name: 'Nikah Ceremony',
    date: 'Wednesday, 22nd April 2026',
    time: '8:30 PM',
    description: 'Sacred wedding ceremony',
    location: 'Puja Shree Marriage House',
    icon: '💍'
  },
  {
    id: 'rukhsati',
    name: 'Rukhsati',
    date: 'Thursday, 23rd April 2026',
    time: '12:00 PM',
    description: 'Farewell ceremony',
    icon: '🌹'
  }
];

export const EventTimeline: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="event-timeline" ref={ref}>
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Auspicious Moments</h2>
        <div className="islamic-pattern-divider" />
      </motion.div>

      <motion.div
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="timeline-card event-card"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="event-icon">{event.icon}</div>
            <h3 className="event-name">{event.name}</h3>
            <time className="event-date">{event.date}</time>
            <div className="event-time">{event.time}</div>
            {event.description && (
              <p className="event-description">{event.description}</p>
            )}
            {event.location && (
              <div className="event-location">📍 {event.location}</div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="venue-info">
        <h3>Main Venue</h3>
        <address>
          <strong>Puja Shree Marriage House</strong><br />
          Near Shiv Mandir, Bariatu<br />
          Ranchi, Jharkhand - 834001
        </address>
      </div>
    </section>
  );
};
```

### 2.4 Countdown Timer Component
```typescript
// src/components/sections/CountdownTimer.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';

export const CountdownTimer: React.FC = () => {
  const weddingDate = new Date('2026-04-22T20:30:00');
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  const numberVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section className="countdown-section">
      <h2 className="countdown-title">Until Our Special Day</h2>
      
      <div className="countdown-container">
        {[
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Minutes' },
          { value: seconds, label: 'Seconds' }
        ].map(({ value, label }) => (
          <div key={label} className="countdown-unit">
            <div className="countdown-number">
              <AnimatePresence mode="wait">
                <motion.span
                  key={value}
                  variants={numberVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {value.toString().padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="countdown-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="countdown-message">
        <p className="islamic-blessing">
          ☪ May Allah bless our union with love and happiness
        </p>
      </div>
    </section>
  );
};
```

## 3. Custom Hooks

### 3.1 Scroll Animation Hook
```typescript
// src/hooks/useScrollAnimation.ts
import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };

    const throttledUpdateScrollY = throttle(updateScrollY, 16); // 60fps

    window.addEventListener('scroll', throttledUpdateScrollY);
    return () => window.removeEventListener('scroll', throttledUpdateScrollY);
  }, []);

  return { scrollY, scrollDirection };
};

// Throttle utility function
function throttle(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  
  return function (...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}
```

### 3.2 Countdown Hook
```typescript
// src/hooks/useCountdown.ts
import { useState, useEffect } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
```

### 3.3 Intersection Observer Hook
```typescript
// src/hooks/useInView.ts
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = (
  options: UseInViewOptions = {}
): [RefObject<HTMLElement>, boolean] => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
};
```

## 4. Global Styles Implementation

### 4.1 CSS Custom Properties
```css
/* src/styles/variables.css */
:root {
  /* Pista Color Palette */
  --pista-primary: #B8C5A6;
  --pista-light: #D4E0C7;
  --pista-dark: #9CAA8A;
  
  /* Complementary Colors */
  --cream-primary: #F5F2E9;
  --beige-light: #F0EDE4;
  --beige-medium: #E8E2D5;
  --beige-dark: #D4CFC0;
  
  /* Accent Colors */
  --gold-accent: #D4AF37;
  --gold-light: #E8C868;
  --gold-dark: #B8941F;
  --islamic-green: #228B22;
  --pearl-white: #FEFEFE;
  
  /* Typography */
  --font-primary: 'Playfair Display', Georgia, serif;
  --font-secondary: 'Poppins', Arial, sans-serif;
  --font-script: 'Dancing Script', cursive;
  --font-arabic: 'Amiri', serif;
  
  /* Spacing Scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-xxl: 3rem;
  
  /* Animations */
  --transition-fast: 0.2s ease-out;
  --transition-medium: 0.4s ease-out;
  --transition-slow: 0.8s ease-out;
  
  /* Shadows */
  --shadow-light: 0 4px 16px rgba(184, 197, 166, 0.1);
  --shadow-medium: 0 8px 32px rgba(156, 170, 138, 0.2);
  --shadow-heavy: 0 16px 48px rgba(156, 170, 138, 0.3);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --cream-primary: #2A2922;
    --beige-light: #3A382F;
    --text-primary: #E8E2D5;
    --text-secondary: #D4CFC0;
  }
}
```

### 4.2 Component Specific Styles
```css
/* src/styles/components/hero.css */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, 
              var(--cream-primary) 0%, 
              var(--pista-light) 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/patterns/islamic-geometric.svg') center/200px;
  opacity: 0.05;
  animation: geometricFloat 20s ease-in-out infinite;
}

.bismillah {
  font-family: var(--font-arabic);
  color: var(--islamic-green);
  margin-bottom: var(--spacing-xl);
  font-size: 1.2rem;
  line-height: 1.8;
}

.bismillah-english {
  font-family: var(--font-primary);
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: var(--spacing-sm);
}

.couple-names {
  margin: var(--spacing-xxl) 0;
}

.bride-name,
.groom-name {
  font-family: var(--font-script);
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--pista-dark);
  margin: 0;
  line-height: 1.2;
}

.wedding-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.lotus-symbol {
  font-size: 2rem;
  animation: rotate 10s linear infinite;
}

.ampersand {
  font-family: var(--font-primary);
  font-size: 2rem;
  color: var(--gold-accent);
  font-style: italic;
}

.quran-verse {
  font-family: var(--font-primary);
  font-style: italic;
  color: var(--islamic-green);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: linear-gradient(135deg, 
              rgba(245, 242, 233, 0.8), 
              rgba(184, 197, 166, 0.1));
  border-radius: 16px;
  border-top: 2px solid var(--gold-accent);
  border-bottom: 2px solid var(--gold-accent);
}

.verse-reference {
  display: block;
  margin-top: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.wedding-date {
  font-family: var(--font-primary);
  font-size: 1.3rem;
  color: var(--text-primary);
  margin: var(--spacing-xl) 0;
  font-weight: 500;
}

.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-xl);
  font-family: var(--font-secondary);
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-medium);
}

.scroll-indicator:hover {
  color: var(--pista-dark);
  transform: translateY(-2px);
}

@keyframes geometricFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-lg);
  }
  
  .bismillah {
    font-size: 1rem;
  }
  
  .quran-verse {
    font-size: 1rem;
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .wedding-date {
    font-size: 1.1rem;
  }
}
```

## 5. Performance Optimizations

### 5.1 Image Optimization
```typescript
// src/components/ui/OptimizedImage.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  placeholder = 'blur',
  blurDataURL
}) => {
  return (
    <motion.div
      className={`image-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        loading={priority ? 'eager' : 'lazy'}
      />
    </motion.div>
  );
};
```

### 5.2 Font Loading Strategy
```typescript
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/fonts/PlayfairDisplay-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/DancingScript-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Amiri-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          {/* Google Fonts with display=swap */}
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

This implementation guide provides a comprehensive foundation for building Ambreen and Inaur's wedding website with React/Next.js, incorporating the pista color palette, Islamic cultural elements, and advanced animations while maintaining performance and accessibility standards.