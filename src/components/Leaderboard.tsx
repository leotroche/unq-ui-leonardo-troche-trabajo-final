import type { LeaderboardEntry } from '../hooks/useLeaderboard'

interface LeaderboardProps {
  scores: LeaderboardEntry[]
}

export function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <section>
      <h2>Leaderboard</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Puntaje</th>
            <th>Palabras</th>
          </tr>
        </thead>

        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td colSpan={4}>Todavía no hay puntajes.</td>
            </tr>
          ) : (
            scores.map((entry, index) => (
              <tr key={`${entry.name}-${entry.score}-${index}`}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.words}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}
