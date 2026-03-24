'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'
import { Heart, Phone } from 'lucide-react'

export const ContactPage: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-cream-50/50">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`contact-float-${i}`}
            className="absolute text-green-100/30"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
            style={{
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 2) * 50}%`
            }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
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
            Contact & RSVP
          </h2>
          <p className="text-gray-600 text-lg">
            Please confirm your presence to help us arrange accordingly
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full p-8 bg-gradient-to-br from-green-50 to-white border border-green-200">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-serif text-green-700 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Phone Numbers:</p>
                      <p className="text-gray-600">9650481417 | 9899578609 | 8448281417</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-800 mb-2">R.S.V.P :</p>
                    <p className="text-gray-600">Adnan</p>
                    <p className="text-gray-600">Anwar&apos;s & Imam&apos;s</p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-800 mb-2">Blessed by:</p>
                    <p className="text-gray-600">Mrs. Kaniza Begum W/o Lt. Mr. Khurshid Anwar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full p-8 bg-gradient-to-br from-cream-50 to-white border border-cream-200">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-serif text-green-700 mb-6">Blessings & Invitation</h3>
                
                <div className="space-y-6 text-center">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-cream-50 rounded-xl border border-green-100">
                    <p className="text-sm text-gray-600 italic mb-2">
                      &quot;In The name of &apos;ALLAH&apos; the most beneficent & merciful&quot;
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-cream-50 to-gold-50 rounded-2xl border border-gold-200">
                    <p className="text-base text-gray-700 font-medium mb-3">
                      Mrs. Kaniza Begum W/o Lt. Mr. Khurshid Anwar
                    </p>
                    <p className="text-lg text-green-700 font-elegant">
                      request your presence for the <strong>NIKAH</strong> of their beloved grand daughter
                    </p>
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="p-6 bg-green-50 rounded-2xl border border-green-100"
                  >
                    <p className="text-lg font-arabic text-green-700 mb-2">
                      بارك الله لكما وبارك عليكما وجمع بينكما في خير
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      May Allah bless you both and bring you together in goodness
                    </p>
                  </motion.div>

                  <div className="space-y-3">
                    <p className="font-script text-2xl text-green-600">
                      Ambreen Aftab
                    </p>
                    <p className="text-gray-600 text-sm">D/o Mr. Aftab Anwar & Mrs. Karishma Begum</p>
                    <p className="text-lg font-elegant text-gray-700">with</p>
                    <p className="font-script text-2xl text-green-600">
                      Inamur Rahman
                    </p>
                    <p className="text-gray-600 text-sm">S/o Mr. Hifzur Rahman & Mrs. Shahnaz Fatma</p>
                    <p className="text-gray-600 text-sm">Bukhara Road, Bijnor (UP)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-green-50 to-cream-50 rounded-3xl border border-green-200/50 shadow-lg">
              <div className="space-y-4">
                <Heart className="w-12 h-12 text-green-600 mx-auto" fill="currentColor" />
                <p className="text-xl font-elegant text-gray-700 italic">
                  &quot;Your presence would be the greatest blessing as we begin this beautiful journey together&quot;
                </p>
                <div className="flex items-center justify-center gap-4 text-green-400 mt-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-32" />
                </div>
                <p className="text-green-600 font-script text-lg">
                  With love and duas from both families
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}