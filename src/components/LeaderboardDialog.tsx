import { useEffect, useRef } from 'react'

import { useLeaderboard } from '../hooks/useLeaderboard'
import { Leaderboard } from './Leaderboard'

interface LeaderboardDialogProps {
  open: boolean
  onClose: () => void
}

export function LeaderboardDialog({ open, onClose }: LeaderboardDialogProps) {
  const { scores } = useLeaderboard()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <article>
        <header>
          <button type="button" aria-label="Cerrar" rel="prev" onClick={onClose} />
          <h2>Tabla de posiciones</h2>
        </header>

        <Leaderboard scores={scores} />
      </article>
    </dialog>
  )
}
