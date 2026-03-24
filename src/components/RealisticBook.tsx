'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, PanInfo, useAnimation, AnimatePresence } from 'framer-motion'

interface PageProps {
  children: React.ReactNode
  pageNumber: number
}

const Page: React.FC<PageProps> = ({ children, pageNumber }) => (
  <div className="w-full h-full bg-gradient-to-br from-cream-50 to-white relative overflow-hidden">
    {/* Page texture */}
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4d8' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    />
    
    {/* Content */}
    <div className="w-full h-full overflow-y-auto relative z-10">
      {children}
    </div>
  </div>
)

interface RealisticBookProps {
  pages: React.ReactNode[]
  className?: string
}

export const RealisticBook: React.FC<RealisticBookProps> = ({ pages, className = '' }) => {
  const [currentSpread, setCurrentSpread] = useState(0) // 0 means showing pages 0-1, 1 means 2-3, etc.
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const flipProgress = useMotionValue(0)
  const dragX = useMotionValue(0)
  const controls = useAnimation()
  
  const totalSpreads = Math.ceil(pages.length / 2)
  const canFlipNext = currentSpread < totalSpreads - 1
  const canFlipPrev = currentSpread > 0

  // Transform for page curl effect
  const curlRotation = useTransform(flipProgress, [0, 1], [0, 180])
  const curlScale = useTransform(flipProgress, [0, 0.5, 1], [1, 0.95, 1])
  const shadowOpacity = useTransform(flipProgress, [0, 1], [0, 0.3])

  const startFlip = useCallback(async (direction: 'next' | 'prev') => {
    if (isFlipping) return
    if (direction === 'next' && !canFlipNext) return
    if (direction === 'prev' && !canFlipPrev) return
    
    setIsFlipping(true)
    setFlipDirection(direction)
    
    // Animate flip progress from 0 to 1
    await controls.start({
      flipProgress: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for natural page turn
      }
    })
  }, [isFlipping, canFlipNext, canFlipPrev, controls])

  const completeFlip = useCallback(async () => {
    if (!flipDirection) return
    
    // Update the current spread
    if (flipDirection === 'next') {
      setCurrentSpread(prev => Math.min(prev + 1, totalSpreads - 1))
    } else {
      setCurrentSpread(prev => Math.max(prev - 1, 0))
    }
    
    // Reset flip state
    flipProgress.set(0)
    setIsFlipping(false)
    setFlipDirection(null)
    
    // Reset controls
    controls.set({ flipProgress: 0 })
  }, [flipDirection, totalSpreads, flipProgress, controls])

  // Handle drag gestures
  const handleDragStart = () => {
    if (isFlipping) return
    setIsFlipping(true)
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isFlipping) return
    
    const { offset } = info
    const progress = Math.abs(offset.x) / 300 // 300px for full flip
    const clampedProgress = Math.min(Math.max(progress, 0), 1)
    
    flipProgress.set(clampedProgress)
    
    // Determine direction based on drag
    if (Math.abs(offset.x) > 50) {
      const direction = offset.x > 0 ? 'prev' : 'next'
      if ((direction === 'next' && canFlipNext) || (direction === 'prev' && canFlipPrev)) {
        setFlipDirection(direction)
      }
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isFlipping) return
    
    const { offset, velocity } = info
    const threshold = 120
    const velocityThreshold = 500
    
    const shouldComplete = Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold
    
    if (shouldComplete && flipDirection) {
      // Complete the flip
      controls.start({
        flipProgress: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      }).then(completeFlip)
    } else {
      // Cancel the flip
      controls.start({
        flipProgress: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      }).then(() => {
        setIsFlipping(false)
        setFlipDirection(null)
      })
    }
  }

  // Navigation functions
  const nextSpread = () => startFlip('next').then(completeFlip)
  const prevSpread = () => startFlip('prev').then(completeFlip)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSpread()
      } else if (e.key === 'ArrowLeft') {
        prevSpread()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSpread, isFlipping])

  // Get current pages for the spread
  const leftPageIndex = currentSpread * 2
  const rightPageIndex = leftPageIndex + 1
  const leftPage = pages[leftPageIndex]
  const rightPage = pages[rightPageIndex]

  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center ${className}`}>
      {/* Book background and lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100" />
      
      {/* Ambient book shadows */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative bg-amber-900/20 rounded-lg blur-3xl"
          style={{
            width: 'min(85vw, 900px)',
            height: 'min(80vh, 650px)',
          }}
        />
      </div>

      {/* Book container */}
      <div 
        ref={containerRef}
        className="relative z-10"
        style={{
          width: 'min(90vw, 1000px)',
          height: 'min(85vh, 700px)',
          perspective: '2000px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* Book binding/spine */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-20"
          style={{
            width: '12px',
            background: 'linear-gradient(90deg, #7c2d12 0%, #991b1b 25%, #7c2d12 50%, #991b1b 75%, #7c2d12 100%)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)',
            borderRadius: '2px'
          }}
        />

        {/* Left page */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 border-r-2 border-gray-200"
          style={{ 
            width: '50%',
            transformStyle: 'preserve-3d',
            originX: 1, // Right edge as pivot
          }}
          drag="x"
          dragConstraints={{ left: -400, right: 400 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {/* Left page content */}
          <motion.div
            className="w-full h-full shadow-2xl"
            style={{
              rotateY: flipDirection === 'prev' ? curlRotation : 0,
              scale: flipDirection === 'prev' ? curlScale : 1,
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Page front */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {leftPage && (
                <Page pageNumber={leftPageIndex}>
                  {leftPage}
                </Page>
              )}
            </div>
            
            {/* Page back */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-gray-300 text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-xs">Page {leftPageIndex + 1}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Page curl shadow */}
          {isFlipping && flipDirection === 'prev' && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                opacity: shadowOpacity
              }}
            />
          )}
        </motion.div>

        {/* Right page */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 border-l-2 border-gray-200"
          style={{ 
            width: '50%',
            transformStyle: 'preserve-3d',
            originX: 0, // Left edge as pivot
          }}
          drag="x"
          dragConstraints={{ left: -400, right: 400 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {/* Right page content */}
          <motion.div
            className="w-full h-full shadow-2xl"
            style={{
              rotateY: flipDirection === 'next' ? curlRotation : 0,
              scale: flipDirection === 'next' ? curlScale : 1,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Page front */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {rightPage && (
                <Page pageNumber={rightPageIndex}>
                  {rightPage}
                </Page>
              )}
            </div>
            
            {/* Page back */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-gray-300 text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-xs">Page {rightPageIndex + 1}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Page curl shadow */}
          {isFlipping && flipDirection === 'next' && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                opacity: shadowOpacity
              }}
            />
          )}
        </motion.div>

        {/* Page curl highlight effect */}
        {isFlipping && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: `radial-gradient(ellipse at ${flipDirection === 'next' ? 'left' : 'right'} center, 
                rgba(255,255,255,0.2) 0%, 
                rgba(255,255,255,0.1) 30%, 
                transparent 60%)`,
              opacity: shadowOpacity
            }}
          />
        )}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-amber-200/50">
          {/* Previous Button */}
          <button
            onClick={prevSpread}
            disabled={!canFlipPrev || isFlipping}
            className={`p-3 rounded-full transition-all duration-200 ${
              !canFlipPrev || isFlipping
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-amber-600 hover:bg-amber-100 active:bg-amber-200 hover:scale-110'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {/* Page indicators */}
          <div className="flex items-center gap-3">
            {Array.from({ length: totalSpreads }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentSpread && !isFlipping) {
                    setCurrentSpread(index)
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSpread
                    ? 'w-8 bg-amber-600'
                    : 'w-2 bg-gray-300 hover:bg-amber-400'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSpread}
            disabled={!canFlipNext || isFlipping}
            className={`p-3 rounded-full transition-all duration-200 ${
              !canFlipNext || isFlipping
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-amber-600 hover:bg-amber-100 active:bg-amber-200 hover:scale-110'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Page counter */}
      <div className="absolute top-8 right-8 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-amber-200/50">
          <span className="text-sm font-medium text-amber-700">
            Pages {leftPageIndex + 1}-{rightPageIndex <= pages.length - 1 ? rightPageIndex + 1 : pages.length} of {pages.length}
          </span>
        </div>
      </div>

      {/* Swipe instructions */}
      {currentSpread === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-amber-200/50">
            <p className="text-amber-700 text-sm font-medium mb-1">Swipe to turn pages</p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span>👈</span>
              <span className="animate-pulse">📖</span>
              <span>👉</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Flipping indicator */}
      {isFlipping && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-3xl"
            >
              📖
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}