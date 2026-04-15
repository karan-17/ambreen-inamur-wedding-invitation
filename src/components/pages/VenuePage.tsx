'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'
import { MapPin } from 'lucide-react'

export const VenuePage: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-green-50 via-cream-50 to-green-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`venue-float-${i}`}
            className="absolute"
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2) * 20 - 10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 12 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-br from-green-200/40 to-gold-200/40 rounded-full blur-sm" />
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
            Venue & Location
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            <Card className="p-8 bg-white/70 backdrop-blur-md border border-green-200">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-green-700 mb-4">Main Ceremony Venue</h3>
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-800">PUJA SHREE MARRIAGE HOUSE</p>
                    <p className="text-gray-600 flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      Near Shiv Mandir, Bariatu, Ranchi, Jharkhand - 834001
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-xl font-serif text-green-700 mb-3">Host Family</h4>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Mr. Aftab Anwar & Mrs. Karishma Begum</strong></p>
                    {/* <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      1335-A, Hindpiri, Banai Raja Lane, Ranchi, Jharkhand - 834001
                    </p> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <Card className="p-8 bg-white/70 backdrop-blur-md border border-green-200">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-serif text-green-700 mb-4">Special Notes</h3>
                
                <div className="space-y-4 text-gray-600">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="font-medium text-green-700">Mehndi Ceremony</p>
                    <p>Will be held at the bride&apos;s family residence</p>
                  </div>
                  
                  <div className="p-4 bg-cream-50 rounded-lg border border-cream-200">
                    <p className="font-medium text-gray-700">Accommodation</p>
                    <p>Please contact host family for accommodation arrangements</p>
                  </div>

                  <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                    <p className="font-medium text-gold-700">Directions</p>
                    <p>The venue is easily accessible and well-known in the Bariatu area of Ranchi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Venue Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden bg-white/70 backdrop-blur-md border border-green-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif text-green-700 mb-6 text-center">Location Overview</h3>
              
              {/* Map placeholder with decorative elements */}
              <div className="relative h-64 bg-gradient-to-br from-green-100 to-cream-100 rounded-xl border border-green-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-green-600 mx-auto" />
                  <div>
                    <p className="text-xl font-semibold text-green-700">PUJA SHREE MARRIAGE HOUSE</p>
                    <p className="text-gray-600">Near Shiv Mandir, Bariatu</p>
                    <p className="text-gray-600">Ranchi, Jharkhand - 834001</p>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Interactive map will be available closer to the wedding date
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 italic font-elegant text-lg">
              &quot;We look forward to celebrating this joyous occasion with you in the beautiful city of Ranchi&quot;
            </p>
            <div className="flex items-center justify-center gap-4 text-green-400 mt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
              <MapPin className="w-6 h-6" fill="currentColor" />
              <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}