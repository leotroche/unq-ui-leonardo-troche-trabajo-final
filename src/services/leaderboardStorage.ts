import type { LeaderboardEntry } from '../types/leaderboard'

const STORAGE_KEY = 'palabras-encadenadas-leaderboard'

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function saveLeaderboard(entries: LeaderboardEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function clearLeaderboard(): void {
  localStorage.removeItem(STORAGE_KEY)
}
