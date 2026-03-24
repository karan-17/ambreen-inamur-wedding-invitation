export interface WeddingDetails {
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  ceremonyVenue: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  receptionVenue?: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  dressCode?: string
  rsvpDeadline?: string
  registryLinks?: {
    name: string
    url: string
  }[]
}

export interface RSVPResponse {
  id: string
  name: string
  email?: string
  phone?: string
  attending: 'yes' | 'no'
  guestCount?: number
  dietaryRestrictions?: string
  specialRequests?: string
  message?: string
  submittedAt: string
}

export interface PhotoGalleryItem {
  id: string
  url: string
  alt: string
  caption?: string
  category?: 'engagement' | 'couple' | 'family' | 'friends'
}

export interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  time?: string
  location?: string
  icon?: string
}