import { useState } from 'react'

import { loadLeaderboard, saveLeaderboard } from '../services/leaderboardStorage'
import type { LeaderboardEntry } from '../types/leaderboard'

const MAX_ENTRIES = 10

const rankLeaderboard = (entries: LeaderboardEntry[]): LeaderboardEntry[] => {
  return [...entries].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES)
}

export function useLeaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>(() => rankLeaderboard(loadLeaderboard()))

  const saveScore = (entry: LeaderboardEntry) => {
    setScores((prev) => {
      const updated = rankLeaderboard([...prev, entry])

      saveLeaderboard(updated)

      return updated
    })
  }

  return {
    scores,
    saveScore,
  }
}
