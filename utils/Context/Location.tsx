/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'

import { LocationData } from '@/request/models'

interface LocationContextType {
  location: LocationData
  loading: boolean
  error: Error | null
  refreshLocation: () => void
  locationArea: any
}

const LocationContext = createContext<LocationContextType>({
  location: {
    latitude: 0,
    longitude: 0
  },
  loading: false,
  error: null,
  refreshLocation: () => {},
  locationArea: {}
})

export const useLocationContext = () => useContext(LocationContext)

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [location, setLocation] = useState<LocationData>({
    latitude: 0,
    longitude: 0
  })
  const [locationArea, setlocationArea] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const refreshLocation = async () => {
    setLoading(true)
    try {
      const loc = await requestLocationPermission()
      setLocation(loc)

      const res = await apiLocation(loc)
      setlocationArea(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function apiLocation({ latitude, longitude }: LocationData) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  async function requestLocationPermission(): Promise<LocationData> {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation'
      })

      if (
        permissionStatus.state === 'granted' ||
        permissionStatus.state === 'prompt'
      ) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          }
        )
        return getLocationFromPosition(position)
      } else {
        return {
          latitude: 0,
          longitude: 0
        }
      }
    } catch (error) {
      console.error('Error requesting permission:', error)
      return {
        latitude: 0,
        longitude: 0
      }
    }
  }

  function getLocationFromPosition(
    position: GeolocationPosition
  ): LocationData {
    const { coords } = position
    return {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
  }
  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        refreshLocation,
        locationArea
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
