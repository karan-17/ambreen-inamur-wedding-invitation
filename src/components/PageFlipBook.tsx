'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PageProps {
  children: React.ReactNode
  pageNumber: number
  isActive: boolean
  direction: 'next' | 'prev' | null
}

const Page: React.FC<PageProps> = ({ children, pageNumber, isActive, direction }) => {
  return (
    <motion.div
      key={pageNumber}
      className="absolute inset-0 w-full h-full"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      initial={false}
      animate={isActive ? "center" : (direction === 'next' ? "right" : "left")}
      variants={{
        left: {
          rotateY: -90,
          x: -50,
          opacity: 0,
          zIndex: 1,
          transformOrigin: 'right center'
        },
        center: {
          rotateY: 0,
          x: 0,
          opacity: 1,
          zIndex: 10,
          transformOrigin: 'center center'
        },
        right: {
          rotateY: 90,
          x: 50,
          opacity: 0,
          zIndex: 1,
          transformOrigin: 'left center'
        }
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier for natural page flip
        opacity: { duration: 0.4 }
      }}
    >
      <div 
        className="w-full h-full bg-gradient-to-br from-cream-50 to-white shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: isActive 
            ? '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)' 
            : '0 10px 30px rgba(0,0,0,0.2)'
        }}
      >
        {/* Page Content */}
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
        
        {/* Page Shadow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: !isActive 
              ? 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)'
              : 'none'
          }}
        />
        
        {/* Page Spine Shadow */}
        <div 
          className={`absolute top-0 bottom-0 w-2 bg-gradient-to-r from-gray-300/30 to-transparent transition-opacity duration-300 ${
            direction === 'prev' ? 'right-0 opacity-100' : direction === 'next' ? 'left-0 opacity-100' : 'left-0 opacity-0'
          }`}
        />
      </div>
    </motion.div>
  )
}

interface PageFlipBookProps {
  pages: React.ReactNode[]
  className?: string
}

export const PageFlipBook: React.FC<PageFlipBookProps> = ({ pages, className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const totalPages = pages.length

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true)
      // setDirection('next') // Removed as direction is not used
      setCurrentPage(prev => prev + 1)
      setTimeout(() => {
        setIsFlipping(false)
        // setDirection(null) // Removed as direction is not used
      }, 800)
    }
  }, [currentPage, totalPages, isFlipping])

  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      // setDirection('prev') // Removed as direction is not used
      setCurrentPage(prev => prev - 1)
      setTimeout(() => {
        setIsFlipping(false)
        // setDirection(null) // Removed as direction is not used
      }, 800)
    }
  }, [currentPage, isFlipping])

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextPage()
    } else if (isRightSwipe) {
      prevPage()
    }
  }

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
    <div className={`relative w-full min-h-screen ${className}`}>
      {/* Book Container */}
      <div 
        className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-green-100 to-cream-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          perspective: '1200px'
        }}
      >
        {/* Pages */}
        <AnimatePresence mode="sync">
          {pages.map((page, index) => (
            <Page
              key={index}
              pageNumber={index}
              isActive={index === currentPage}
              direction={
                index < currentPage ? 'prev' : 
                index > currentPage ? 'next' : null
              }
            >
              {page}
            </Page>
          ))}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-green-200/50">
            {/* Previous Button */}
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                currentPage === 0 || isFlipping
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-100 active:bg-green-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Page Indicator */}
            <div className="flex items-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentPage && !isFlipping) {
                      setIsFlipping(true)
                      // setDirection(index > currentPage ? 'next' : 'prev') // Removed as direction is not used
                      setCurrentPage(index)
                      setTimeout(() => {
                        setIsFlipping(false)
                        // setDirection(null) // Removed as direction is not used
                      }, 800)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-green-600 scale-125'
                      : 'bg-gray-300 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isFlipping}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                currentPage === totalPages - 1 || isFlipping
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-100 active:bg-green-200'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Page Counter */}
        <div className="absolute top-8 right-8 z-40">
          <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-green-200/50">
            <span className="text-sm font-medium text-green-700">
              {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* Subtle Page Flip Sound Effect Indicator */}
        {isFlipping && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-2xl"
              >
                📖
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}