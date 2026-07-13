import type { LeaderboardEntry } from '../types/leaderboard'

interface LeaderboardProps {
  scores: LeaderboardEntry[]
}

const POSITION_EMOJIS = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿'] as const
const getPositionLabel = (index: number) => POSITION_EMOJIS[index] ?? index + 1

export function Leaderboard({ scores }: LeaderboardProps) {
  const hasScores = scores.length > 0

  return (
    <table className="striped">
      <thead>
        <tr>
          <th scope="col">Posición</th>
          <th scope="col">Nombre</th>
          <th scope="col">Puntaje</th>
          <th scope="col">Palabras</th>
        </tr>
      </thead>

      <tbody>
        {!hasScores && (
          <tr>
            <td colSpan={4} className="text-center">
              No hay puntajes para mostrar
            </td>
          </tr>
        )}

        {scores.map((entry, index) => (
          <tr key={`${entry.name}-${entry.score}-${index}`}>
            <th scope="row">{getPositionLabel(index)}</th>
            <td>{entry.name}</td>
            <td>{entry.score}</td>
            <td>{entry.words}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
