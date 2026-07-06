interface GameOverProps {
  score: number
  wordsCount: number
  onRestart: () => void
}

export function GameOver({ score, wordsCount, onRestart }: GameOverProps) {
  return (
    <section>
      <h2>¡Fin de la partida!</h2>

      <p>
        <strong>Palabras encadenadas:</strong> {wordsCount}
      </p>

      <p>
        <strong>Puntaje final:</strong> {score}
      </p>

      <button onClick={onRestart}>Jugar nuevamente</button>
    </section>
  )
}
