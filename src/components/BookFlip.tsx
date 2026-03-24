'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, PanInfo, useAnimation } from 'framer-motion'

interface BookPageProps {
  children: React.ReactNode
  pageNumber: number
  isLeft?: boolean
  isFlipping?: boolean
  flipProgress?: number
  zIndex?: number
}

const BookPage: React.FC<BookPageProps> = ({ 
  children, 
  pageNumber, 
  isLeft = false, 
  isFlipping = false,
  flipProgress = 0,
  zIndex = 1
}) => {
  const flipAngle = useTransform(useMotionValue(flipProgress), [0, 1], [0, 180])
  
  return (
    <div
      className="absolute inset-0"
      style={{ 
        zIndex,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateY: flipAngle,
          transformOrigin: isLeft ? 'right center' : 'left center',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of page */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cream-50 to-white shadow-2xl border border-gray-200 overflow-hidden relative">
            {/* Page thickness effect */}
            <div 
              className={`absolute top-0 bottom-0 w-2 ${
                isLeft ? 'right-0' : 'left-0'
              }`}
              style={{
                background: isLeft 
                  ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)'
                  : 'linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                transform: `translateZ(${isFlipping ? '10px' : '2px'})`,
                transition: 'transform 0.3s ease'
              }}
            />
            
            {/* Page content */}
            <div className="w-full h-full overflow-y-auto relative z-10">
              {children}
            </div>
            
            {/* Enhanced page curl shadow */}
            <div 
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: isFlipping 
                  ? `radial-gradient(ellipse at ${isLeft ? 'right' : 'left'} center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)`
                  : 'none',
                opacity: flipProgress * 0.8
              }}
            />
            
            {/* Book binding area with enhanced depth */}
            <div 
              className={`absolute top-0 bottom-0 w-8 ${
                isLeft 
                  ? 'right-0' 
                  : 'left-0'
              }`}
              style={{
                background: isLeft
                  ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.25) 100%)'
                  : 'linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.25) 100%)'
              }}
            />
          </div>
        </div>
        
        {/* Back of page */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cream-100 to-gray-50 shadow-inner">
            {/* Back side content (could be blank or contain back matter) */}
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📖</div>
                <p className="text-sm">Page {pageNumber + 1}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface BookFlipProps {
  pages: React.ReactNode[]
  className?: string
}

export const BookFlip: React.FC<BookFlipProps> = ({ pages, className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipProgress, setFlipProgress] = useState(0)
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const controls = useAnimation()
  
  const totalPages = pages.length
  const canFlipNext = currentPage < totalPages - 1
  const canFlipPrev = currentPage > 0

  // Transform drag distance to flip progress
  const dragProgress = useTransform(dragX, [-200, 0, 200], [1, 0, 1])
  
  useEffect(() => {
    const unsubscribe = dragProgress.onChange((value) => {
      if (isFlipping) {
        setFlipProgress(Math.abs(value))
      }
    })
    return unsubscribe
  }, [dragProgress, isFlipping])

  const startFlip = (direction: 'left' | 'right') => {
    if ((direction === 'right' && !canFlipNext) || (direction === 'left' && !canFlipPrev)) {
      return
    }
    
    setIsFlipping(true)
    setDragDirection(direction)
    setFlipProgress(0)
  }

  const completeFlip = async (direction: 'left' | 'right') => {
    // Animate to completion
    await controls.start({
      x: direction === 'right' ? -400 : 400,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: 0.5 
      }
    })
    
    // Update page
    if (direction === 'right' && canFlipNext) {
      setCurrentPage(prev => prev + 1)
    } else if (direction === 'left' && canFlipPrev) {
      setCurrentPage(prev => prev - 1)
    }
    
    // Reset
    dragX.set(0)
    setFlipProgress(0)
    setIsFlipping(false)
    setDragDirection(null)
    
    controls.set({ x: 0 })
  }

  const cancelFlip = async () => {
    await controls.start({
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40 
      }
    })
    
    setFlipProgress(0)
    setIsFlipping(false)
    setDragDirection(null)
    dragX.set(0)
  }

  const handleDragStart = () => {
    setIsFlipping(true)
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info
    
    if (Math.abs(offset.x) > 50 && !dragDirection) {
      const direction = offset.x > 0 ? 'left' : 'right'
      if ((direction === 'right' && canFlipNext) || (direction === 'left' && canFlipPrev)) {
        setDragDirection(direction)
      }
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const threshold = 100
    const velocityThreshold = 500
    
    const shouldComplete = Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold
    
    if (shouldComplete && dragDirection) {
      completeFlip(dragDirection)
    } else {
      cancelFlip()
    }
  }

  // Navigation functions
  const nextPage = useCallback(() => {
    if (canFlipNext && !isFlipping) {
      startFlip('right')
      setTimeout(() => completeFlip('right'), 100)
    }
  }, [canFlipNext, isFlipping, startFlip, completeFlip])

  const prevPage = useCallback(() => {
    if (canFlipPrev && !isFlipping) {
      startFlip('left')
      setTimeout(() => completeFlip('left'), 100)
    }
  }, [canFlipPrev, isFlipping, startFlip, completeFlip])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPage()
      } else if (e.key === 'ArrowLeft') {
        prevPage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage, isFlipping, nextPage, prevPage])

  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 ${className}`}>
      {/* Book container with realistic perspective */}
      <div 
        ref={containerRef}
        className="relative"
        style={{
          width: 'min(90vw, 800px)',
          height: 'min(90vh, 600px)',
          perspective: '1200px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Book base/spine with enhanced realism */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-6 transform -translate-x-1/2"
          style={{
            zIndex: 0,
            background: 'linear-gradient(90deg, #8B4513 0%, #654321 20%, #4A2C17 40%, #654321 60%, #8B4513 80%, #A0522D 100%)',
            boxShadow: `
              0 0 40px rgba(0,0,0,0.6),
              inset 0 0 15px rgba(0,0,0,0.4),
              inset 2px 0 5px rgba(255,255,255,0.1),
              inset -2px 0 5px rgba(0,0,0,0.3)
            `,
            borderRadius: '0 2px 2px 0'
          }}
        >
          {/* Book spine texture lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`spine-line-${i}`}
              className="absolute w-full"
              style={{
                height: '1px',
                top: `${8 + i * 8}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
              }}
            />
          ))}
        </div>
        
        {/* Left page */}
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          style={{ 
            width: '50%',
            transformStyle: 'preserve-3d',
            x: dragX
          }}
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.1}
          animate={controls}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {currentPage > 0 && (
            <BookPage
              pageNumber={currentPage - 1}
              isLeft={true}
              isFlipping={isFlipping && dragDirection === 'left'}
              flipProgress={dragDirection === 'left' ? flipProgress : 0}
              zIndex={dragDirection === 'left' ? 10 : 5}
            >
              {pages[currentPage - 1]}
            </BookPage>
          )}
        </motion.div>

        {/* Right page */}
        <motion.div
          className="absolute right-0 top-0 bottom-0"
          style={{ 
            width: '50%',
            transformStyle: 'preserve-3d',
            x: dragX
          }}
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.1}
          animate={controls}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {currentPage < totalPages && (
            <BookPage
              pageNumber={currentPage}
              isLeft={false}
              isFlipping={isFlipping && dragDirection === 'right'}
              flipProgress={dragDirection === 'right' ? flipProgress : 0}
              zIndex={dragDirection === 'right' ? 10 : 5}
            >
              {pages[currentPage]}
            </BookPage>
          )}
        </motion.div>

        {/* Page curl effect overlay */}
        {isFlipping && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${dragDirection === 'right' ? 'right' : 'left'} center, rgba(0,0,0,0.1) 0%, transparent 70%)`,
              opacity: flipProgress * 0.5
            }}
          />
        )}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-amber-200/50">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={!canFlipPrev || isFlipping}
            className={`p-2 rounded-full transition-colors ${
              !canFlipPrev || isFlipping
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-amber-600 hover:bg-amber-100 active:bg-amber-200'
            }`}
          >
            ←
          </button>

          {/* Page indicators */}
          <div className="flex items-center gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentPage && !isFlipping) {
                    if (index > currentPage) {
                      setCurrentPage(index)
                    } else {
                      setCurrentPage(index)
                    }
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-amber-600 scale-125'
                    : 'bg-gray-300 hover:bg-amber-400'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={!canFlipNext || isFlipping}
            className={`p-2 rounded-full transition-colors ${
              !canFlipNext || isFlipping
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-amber-600 hover:bg-amber-100 active:bg-amber-200'
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* Page counter */}
      <div className="absolute top-8 right-8 z-40">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-amber-200/50">
          <span className="text-sm font-medium text-amber-700">
            {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div>

      {/* Swipe hint */}
      {currentPage === 0 && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
          <p className="text-amber-600 text-sm mb-2">Swipe to turn pages</p>
          <div className="text-2xl">👈 📖 👉</div>
        </div>
      )}
    </div>
  )
}