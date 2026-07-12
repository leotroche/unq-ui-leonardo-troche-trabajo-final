import { SaveScoreForm } from './SaveScoreForm'

interface GameOverProps {
  score: number
  wordsCount: number
  onRestart: () => void
  onSaveScore: (name: string) => void
}

export function GameOver({ score, wordsCount, onRestart, onSaveScore }: GameOverProps) {
  return (
    <section className="game-over">
      <h2>¡Fin de la partida!</h2>

      <p>
        <span>Palabras encadenadas:</span> <strong>{wordsCount}</strong>
      </p>

      <p>
        <span>Puntaje final:</span> <strong>{score}</strong>
      </p>

      <SaveScoreForm onSave={onSaveScore} />

      <button type="button" className="secondary" onClick={onRestart}>
        Jugar nuevamente
      </button>
    </section>
  )
}
