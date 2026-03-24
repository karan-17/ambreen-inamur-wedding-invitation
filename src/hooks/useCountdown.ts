import { useState, useEffect, useCallback } from 'react'
import { differenceInMilliseconds } from 'date-fns'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  isExpired: boolean
}

export const useCountdown = (targetDate: Date | string): TimeLeft => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const target = new Date(targetDate)
    const now = new Date()
    const difference = differenceInMilliseconds(target, now)

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        isExpired: true,
      }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference,
      isExpired: false,
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, calculateTimeLeft])

  return timeLeft
}