'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin } from 'lucide-react'

export const CoverPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-cream-50 to-green-100">
      {/* Romantic Floating Background Elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-green-200/20"
              initial={{ 
                x: 100 + (i * 80),
                y: 800,
                rotate: 0,
                scale: 0.3 + (i % 3) * 0.2
              }}
              animate={{
                y: -100,
                rotate: 360,
                x: 150 + (i * 90)
              }}
              transition={{
                duration: 15 + (i % 8) * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            >
              <Heart className="w-6 h-6" fill="currentColor" />
            </motion.div>
          ))}
          
          {/* Floating Rose Petals */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              className="absolute"
              initial={{ 
                x: 50 + (i * 70),
                y: -50,
                rotate: 0,
                opacity: 0.4
              }}
              animate={{
                y: 900,
                rotate: (i % 3) * 240,
                x: 80 + (i * 75)
              }}
              transition={{
                duration: 10 + (i % 5) * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
            >
              <div className="w-3 h-3 bg-gradient-to-br from-green-300/40 to-gold-300/40 rounded-full blur-sm" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Islamic Geometric Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="islamic-pattern-cover" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
              <path d="M10,2 L18,10 L10,18 L2,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-cover)" className="text-green-400" />
        </svg>
      </div>

      {/* Bismillah */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center z-10"
      >
        <p className="text-sm md:text-base text-green-700 font-arabic mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <p className="text-xs md:text-sm text-gray-600 italic">In the name of Allah, the most beneficent & merciful</p>
      </motion.div>

      <div className="container-width section-padding text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="space-y-8 mt-16"
        >
          {/* Wedding Invitation Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-script text-2xl md:text-3xl text-green-600 mb-4 flex items-center justify-center gap-4"
          >
            <Heart className="w-6 h-6 text-gold-500" />
            <span>Wedding Invitation</span>
            <Heart className="w-6 h-6 text-gold-500" />
          </motion.div>

          {/* Quranic Verse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-base text-gray-600 italic max-w-2xl mx-auto mb-8"
          >
            &quot;And We created you in pairs.&quot; - Quran 78:8
          </motion.div>

          {/* Couple Names */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
              className="font-script text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent"
            >
              Ambreen
            </motion.h1>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: 'spring' }}
              className="flex items-center justify-center space-x-4 text-gold-500"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-20" />
              <span className="text-2xl md:text-3xl font-serif">weds</span>
              <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-20" />
            </motion.div>
            
            <motion.h1 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.3, type: 'spring' }}
              className="font-script text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent"
            >
              Inam
            </motion.h1>
          </div>

          {/* A Cordial Invitation From */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="space-y-4 text-gray-700 max-w-2xl mx-auto"
          >
            <div className="text-lg italic font-elegant mb-4">
              A Cordial Invitation From:
            </div>
            <div className="text-xl font-semibold">
              Mr. Aftab & Mrs. Karishma
            </div>
            <div className="text-sm text-gray-600">
              1335-A, Hindpiri, Banai Raja Lane, Ranchi, Jharkhand - 834001
            </div>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="font-elegant text-2xl md:text-3xl text-gray-700 tracking-wide flex items-center justify-center gap-3"
          >
            <Calendar className="w-8 h-8 text-green-600" />
            <span>Wednesday, 22nd April 2026</span>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="font-sans text-lg md:text-xl text-gray-600 flex items-center justify-center gap-3"
          >
            <MapPin className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold">PUJA SHREE MARRIAGE HOUSE</p>
              <p className="text-sm">Near Shiv Mandir, Bariatu, Ranchi, Jharkhand</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Swipe Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <p className="text-sm">Swipe or use arrows to turn pages</p>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              👉
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Islamic Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-10 text-green-200 opacity-30 hidden md:block"
      >
        <Heart className="w-16 h-16" fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 right-10 text-gold-200 opacity-30 hidden md:block"
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </motion.div>
    </div>
  )
}