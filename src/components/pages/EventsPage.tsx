'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Heart } from 'lucide-react'

export const EventsPage: React.FC = () => {
  const events = [
    {
      title: 'Haldi Ceremony',
      date: 'Monday, 20th April 2026',
      time: '4:00 PM',
      venue: 'At Our Residence',
      description: 'Traditional turmeric ceremony'
    },
    {
      title: 'Mehndi Ceremony', 
      date: 'Tuesday, 21st April 2026',
      time: '6:00 PM',
      venue: 'At Our Residence',
      description: 'Henna celebration with music and dance'
    },
    {
      title: 'Nikah & Reception',
      date: 'Wednesday, 22nd April 2026', 
      time: 'Baraat: 8:00 PM | Nikah: 8:30 PM | Dinner: 9:00 PM',
      venue: 'PUJA SHREE MARRIAGE HOUSE',
      description: 'Main wedding ceremony and celebration',
      isMain: true
    },
    {
      title: 'Rukhsati Ceremony',
      date: 'Thursday, 23rd April 2026',
      time: '12:00 PM (Noon)',
      venue: 'PUJA SHREE MARRIAGE HOUSE', 
      description: 'Farewell ceremony'
    }
  ]

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-cream-50/50">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`events-float-${i}`}
            className="absolute text-green-100/30"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 2) * 60}%`
            }}
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container-width h-full overflow-y-auto relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-script bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Auspicious Moments
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto italic font-script">
            Insha-Allah
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                event.isMain 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
                  : 'bg-gradient-to-br from-cream-50 to-white border border-gray-200'
              }`}
            >
              {event.isMain && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-gold-500 text-white p-3 rounded-full"
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
              )}
              
              <div className="space-y-4">
                <h3 className={`text-2xl md:text-3xl font-serif ${
                  event.isMain ? 'text-green-700' : 'text-gray-800'
                }`}>
                  {event.title}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 italic">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 mb-8"
        >
          <div className="flex items-center justify-center gap-4 text-green-400">
            <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
            <Heart className="w-6 h-6" fill="currentColor" />
            <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
          </div>
          <p className="text-gray-600 italic mt-4 font-elegant">
            Join us as we celebrate the union of two hearts
          </p>
        </motion.div>
      </div>
    </div>
  )
}