'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'
import { useCountdown } from '@/hooks'
import { formatCountdownNumber } from '@/utils'
import { Heart } from 'lucide-react'

export const CountdownPage: React.FC = () => {
  const weddingDate = new Date('2026-04-22T20:30:00')
  const countdown = useCountdown(weddingDate)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-green-50 via-cream-50 to-green-100">
      {/* Floating Elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`countdown-heart-${i}`}
              className="absolute text-green-200/20"
              animate={{
                y: [0, -20, 0],
                x: [0, (i % 2) * 10 - 5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
            >
              <Heart className="w-4 h-4" fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="container-width h-full flex items-center justify-center relative z-10 p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl relative"
        >
          {/* Decorative Background Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-green-200/30 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-gold-200/40 rounded-full opacity-30"></div>
          
          <Card className="bg-gradient-to-br from-white/80 via-green-50/80 to-cream-50/80 backdrop-blur-md border-2 border-green-200/50 shadow-2xl relative overflow-hidden">
            <CardContent className="p-10">
              {/* Floating Hearts in Background */}
              {isClient && [...Array(8)].map((_, i) => (
                <motion.div
                  key={`card-heart-${i}`}
                  className="absolute text-green-200/20"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, (i % 2) * 10 - 5, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 20}%`
                  }}
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                </motion.div>
              ))}
              
              <div className="text-center mb-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-script text-3xl md:text-4xl text-green-700 mb-2"
                >
                  Countdown to Our Nikah
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 italic"
                >
                  Insha-Allah, Wednesday 22nd April 2026 at 8:30 PM
                </motion.p>
              </div>
              
              {isClient ? (
                !countdown.isExpired ? (
                  <div className="relative">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { value: countdown.days, label: 'Days', color: 'from-green-500 to-emerald-600', icon: '📅' },
                        { value: countdown.hours, label: 'Hours', color: 'from-gold-500 to-gold-600', icon: '⏰' },
                        { value: countdown.minutes, label: 'Minutes', color: 'from-green-600 to-green-700', icon: '⏱️' },
                        { value: countdown.seconds, label: 'Seconds', color: 'from-emerald-500 to-emerald-700', icon: '⚡' },
                      ].map((item, _index) => (
                        <motion.div
                          key={item.label}
                          initial={{ scale: 0, rotateY: 180, opacity: 0 }}
                          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + _index * 0.15, type: 'spring', stiffness: 100 }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 5,
                            transition: { duration: 0.2 }
                          }}
                          className="text-center relative"
                        >
                          <div className="relative group">
                            <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20`}>
                              <div className="text-2xl mb-2 opacity-80">
                                {item.icon}
                              </div>
                              
                              <motion.div 
                                key={item.value}
                                initial={{ scale: 1.3, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="text-5xl md:text-6xl font-bold text-white font-serif mb-2 drop-shadow-lg"
                              >
                                {formatCountdownNumber(item.value)}
                              </motion.div>
                              
                              <div className="text-white/90 uppercase tracking-widest text-sm font-medium">
                                {item.label}
                              </div>
                              
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="text-4xl md:text-6xl font-script bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6"
                    >
                      Alhamdulillah! Today is the Day!
                    </motion.div>
                    <p className="text-xl text-gray-600 mb-4">
                      May Allah bless this beautiful union
                    </p>
                    <div className="text-4xl">🤲💚</div>
                  </div>
                )
              ) : (
                <div className="relative">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Days', color: 'from-green-500 to-emerald-600', icon: '📅' },
                      { label: 'Hours', color: 'from-gold-500 to-gold-600', icon: '⏰' },
                      { label: 'Minutes', color: 'from-green-600 to-green-700', icon: '⏱️' },
                      { label: 'Seconds', color: 'from-emerald-500 to-emerald-700', icon: '⚡' },
                    ].map((item, _index) => (
                      <div
                        key={item.label}
                        className="text-center relative"
                      >
                        <div className="relative group">
                          <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 shadow-xl transition-all duration-300 border-2 border-white/20`}>
                            <div className="text-2xl mb-2 opacity-80">
                              {item.icon}
                            </div>
                            
                            <div className="text-5xl md:text-6xl font-bold text-white font-serif mb-2 drop-shadow-lg animate-pulse">
                              --
                            </div>
                            
                            <div className="text-white/90 uppercase tracking-widest text-sm font-medium">
                              {item.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Central Decorative Element */}
              {isClient && !countdown.isExpired && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-gold-300/50 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm hidden lg:flex"
                >
                  <Heart className="w-6 h-6 text-green-600" fill="currentColor" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}