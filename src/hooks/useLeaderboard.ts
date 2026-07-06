import { useEffect, useState } from 'react'

const STORAGE_KEY = 'leaderboard'
const MAX_ENTRIES = 10

export interface LeaderboardEntry {
  name: string
  score: number
  words: number
}

export function useLeaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (!stored) return

      setScores(JSON.parse(stored))
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const saveScore = (entry: LeaderboardEntry) => {
    const updated = [...scores, entry].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES)

    setScores(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    scores,
    saveScore,
  }
}
