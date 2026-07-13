interface GameStatsProps {
  score: number
  timeLeft: number
}

export function GameStats({ score, timeLeft }: GameStatsProps) {
  return (
    <div className="stats">
      <div>
        <span>Puntaje</span>
        <strong>{score}</strong>
      </div>

      <div>
        <span>Tiempo</span>
        <strong>{timeLeft}</strong>
      </div>
    </div>
  )
}
