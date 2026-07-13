import { useEffect, useRef } from 'react'

interface UseTimerProps {
  enabled: boolean
  onTick: () => void
}

export function useTimer({ enabled, onTick }: UseTimerProps) {
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!enabled) return

    const timerId = setInterval(() => {
      onTickRef.current()
    }, 1000)

    return () => clearInterval(timerId)
  }, [enabled])
}
