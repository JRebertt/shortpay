'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  date: Date
  className?: string
}

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

export const Countdown: React.FC<CountdownProps> = ({ date, className }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  function calculateTimeLeft(): TimeLeft {
    const difference = +date - +new Date()
    let timeLeft: TimeLeft = {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0
    }

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.entries(timeLeft).map(([key, value]) => {
    if (!value) {
      return null
    }

    return (
      <span key={key} className="mx-1">
        {value} {key}{" "}
      </span>
    )
  })

  return (
    <span className={className}>
      {timerComponents.length ? timerComponents : <span>Tempo esgotado!</span>}
    </span>
  )
}