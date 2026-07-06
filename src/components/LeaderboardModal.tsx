import { useEffect, useRef } from 'react'

import type { LeaderboardEntry } from '../hooks/useLeaderboard'
import { Leaderboard } from './Leaderboard'

interface LeaderboardModalProps {
  open: boolean
  scores: LeaderboardEntry[]
  onClose: () => void
}

export function LeaderboardModal({ open, scores, onClose }: LeaderboardModalProps) {
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
      <h2>Leaderboard</h2>

      <Leaderboard scores={scores} />

      <button onClick={onClose}>Cerrar</button>
    </dialog>
  )
}
