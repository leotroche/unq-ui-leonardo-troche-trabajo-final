interface GameStatsProps {
  status: string
  score: number
  timeLeft: number
}

export function GameStats({ status, score, timeLeft }: GameStatsProps) {
  return (
    <article>
      <p>
        <strong>Estado:</strong> {status}
      </p>

      <p>
        <strong>Tiempo restante:</strong> {timeLeft} segundos
      </p>

      <p>
        <strong>Puntaje:</strong> {score}
      </p>
    </article>
  )
}
