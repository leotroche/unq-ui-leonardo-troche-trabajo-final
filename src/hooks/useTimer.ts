import { useEffect } from 'react'

interface UseTimerProps {
  enabled: boolean
  onTick: () => void
}

export function useTimer({ enabled, onTick }: UseTimerProps) {
  useEffect(() => {
    if (!enabled) return

    const timerId = setInterval(() => {
      onTick()
    }, 1000)

    return () => clearInterval(timerId)
  }, [enabled, onTick])
}
