'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Icon } from 'leaflet'

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface MapProps {
  center: [number, number]
  zoom?: number
  height?: string
  address: string
  title: string
  className?: string
}

const MapComponent = ({ center, zoom = 15, height = '12rem', address, title, className = '' }: MapProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [customIcon, setCustomIcon] = useState<Icon | null>(null)

  useEffect(() => {
    setIsMounted(true)
    
    // Only run this on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        import('leaflet/dist/leaflet.css')
        
        // Fix for default markers in react-leaflet
        delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet-images/marker-icon-2x.png',
          iconUrl: '/leaflet-images/marker-icon.png',
          shadowUrl: '/leaflet-images/marker-shadow.png',
        })

        const icon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
        
        setCustomIcon(icon)
      })
    }
  }, [])

  // Show loading placeholder during SSR and initial client render
  if (!isMounted || !customIcon) {
    return (
      <div className={`rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-gray-500 text-sm">Loading map...</div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-green-700">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapComponent