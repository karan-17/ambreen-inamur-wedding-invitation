'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'
import { StaggerContainer } from '@/components/animations'
import { useCountdown, useScrollAnimation } from '@/hooks'
import { formatCountdownNumber } from '@/utils'
import { Calendar, MapPin, Clock, Heart, Phone } from 'lucide-react'

export default function HomePage() {
  // Actual wedding date - Wednesday, 22nd April, 2026 at 8:30 PM (Nikah)
  const weddingDate = new Date('2026-04-22T20:30:00')
  const countdown = useCountdown(weddingDate)
  const [activeSection, setActiveSection] = useState('home')
  
  // Wedding events data from PDF
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

  const { ref: heroRef, inView: heroInView } = useScrollAnimation()
  const { ref: eventsRef, inView: eventsInView } = useScrollAnimation()
  const { ref: venueRef, inView: venueInView } = useScrollAnimation()

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-cream-50 to-green-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-100"
      >
        <div className="container-width py-4">
          <div className="flex justify-center space-x-8">
            {[{id: 'home', label: 'Home'}, {id: 'events', label: 'Events'}, {id: 'venue', label: 'Venue'}, {id: 'contact', label: 'Contact'}].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-green-600' : 'text-gray-600 hover:text-green-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Islamic Geometric Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
                <path d="M10,2 L18,10 L10,18 L2,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" className="text-green-400" />
          </svg>
        </div>

        {/* Bismillah */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-sm md:text-base text-green-700 font-arabic mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <p className="text-xs md:text-sm text-gray-600 italic">In the name of Allah, the most beneficent & merciful</p>
        </motion.div>

        <div className="container-width section-padding text-center relative z-10">
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="space-y-8 mt-16"
            >
              {/* Save the Date with Islamic elements */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-script text-2xl md:text-3xl text-green-600 mb-4 flex items-center justify-center gap-4"
              >
                <Heart className="w-6 h-6 text-gold-500" />
                <span>You&apos;re Invited</span>
                <Heart className="w-6 h-6 text-gold-500" />
              </motion.div>

              {/* Quranic Verse */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm md:text-base text-gray-600 italic max-w-2xl mx-auto mb-8"
              >
                &quot;And We created you in pairs&quot; - Quran 78:8
              </motion.div>

              {/* Couple Names */}
              <div className="space-y-6">
                <motion.h1 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, type: 'spring' }}
                  className="font-script text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent"
                >
                  Ambreen Aftab
                </motion.h1>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring' }}
                  className="flex items-center justify-center space-x-4 text-gold-500"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-20" />
                  <span className="text-2xl md:text-3xl font-serif">&</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent flex-1 max-w-20" />
                </motion.div>
                
                <motion.h1 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3, type: 'spring' }}
                  className="font-script text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent"
                >
                  Inamur Rahman
                </motion.h1>
              </div>

              {/* Family Names */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="space-y-4 text-gray-600 max-w-2xl mx-auto"
              >
                <div className="text-lg">
                  <p><strong>Bride&apos;s Parents:</strong> Mr. Aftab Anwar & Mrs. Karishma Begum</p>
                  <p><strong>Groom&apos;s Parents:</strong> Mr. Hifzur Rahman & Mrs. Shahnaz Fatma</p>
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
          </AnimatePresence>

          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="mt-16"
          >
            <Card className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-green-200 shadow-xl">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl md:text-3xl text-center mb-8 text-gray-800 flex items-center justify-center gap-3">
                  <Clock className="w-8 h-8 text-green-600" />
                  Counting Down to Nikah
                </h2>
                
                {!countdown.isExpired ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { value: countdown.days, label: 'Days' },
                      { value: countdown.hours, label: 'Hours' },
                      { value: countdown.minutes, label: 'Minutes' },
                      { value: countdown.seconds, label: 'Seconds' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ scale: 0, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{ delay: 2.3 + index * 0.1, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                          <motion.div 
                            key={item.value}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-4xl md:text-5xl font-bold text-green-700 font-serif"
                          >
                            {formatCountdownNumber(item.value)}
                          </motion.div>
                          <div className="text-sm md:text-base text-green-600 uppercase tracking-widest mt-2 font-medium">
                            {item.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl md:text-6xl font-script bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
                    >
                      Alhamdulillah! The Day is Here!
                    </motion.div>
                    <p className="text-xl text-gray-600">
                      May Allah bless this beautiful union
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="mt-12"
          >
            <div className="space-y-4">
              <motion.div
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => setActiveSection('events')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-700 hover:to-emerald-700"
                >
                  View All Events
                </button>
              </motion.div>
              
              <div className="text-gray-600 max-w-md mx-auto">
                <p className="italic">Join us for four days of celebration as we unite two hearts in the blessed bond of Nikah</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Islamic Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-10 text-green-200 opacity-30 hidden md:block"
        >
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
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

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 right-20 text-green-100 opacity-20 hidden lg:block"
        >
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </motion.div>
      </section>

      {/* Events Section */}
      <section ref={eventsRef} id="events" className="py-20 bg-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-script bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Wedding Celebration
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us for four beautiful days of traditional ceremonies as we celebrate our union
            </p>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50 }}
                animate={eventsInView ? { opacity: 1, y: 0 } : {}}
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
          </StaggerContainer>
        </div>
      </section>

      {/* Venue Information */}
      <section ref={venueRef} id="venue" className="py-20 bg-gradient-to-b from-green-50 to-cream-50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={venueInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-script bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Venue & Location
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={venueInView ? { opacity: 1, x: 0 } : {}}
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
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        1335-A, Hindpiri, Banai Raja Lane, Ranchi, Jharkhand - 834001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={venueInView ? { opacity: 1, x: 0 } : {}}
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & RSVP */}
      <section id="contact" className="py-20 bg-white">
        <div className="container-width">
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
                      <p className="font-medium text-gray-800 mb-2">RSVP Contact:</p>
                      <p className="text-gray-600">Adnan, Anwar&apos;s & Imam&apos;s</p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-medium text-gray-800 mb-2">Blessed by:</p>
                      <p className="text-gray-600">Mrs. Kaniza Begum W/o Lt. Mr. Khurshid Anwar (Grandmother)</p>
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
                  <h3 className="text-2xl font-serif text-green-700 mb-6">Wedding Wishes</h3>
                  
                  <div className="space-y-4 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
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
                      <p className="text-gray-600 italic">
                        &quot;Your presence is the greatest gift we could ask for as we begin this beautiful journey together.&quot;
                      </p>
                      
                      <div className="pt-4">
                        <p className="font-script text-2xl text-green-600">
                          Ambreen & Inamur
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          With love and duas from both families
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-800 text-white py-12">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center space-y-6"
          >
            <div className="space-y-2">
              <p className="text-lg font-arabic">
                الحمد لله رب العالمين
              </p>
              <p className="text-sm opacity-90">
                All praise is due to Allah, Lord of all the worlds
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <Heart className="w-4 h-4 text-gold-300" />
              <span className="opacity-90">April 22, 2026 | Ranchi, Jharkhand</span>
              <Heart className="w-4 h-4 text-gold-300" />
            </div>

            <p className="text-xs opacity-75">
              Created with love for Ambreen & Inamur&apos;s Wedding
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}