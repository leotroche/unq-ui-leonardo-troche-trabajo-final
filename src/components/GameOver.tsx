import { useState } from 'react'

import { SaveScoreForm } from './SaveScoreForm'

interface GameOverProps {
  score: number
  wordsCount: number
  onReset: () => void
  onSaveScore: (name: string) => void
}

export function GameOver({ score, wordsCount, onReset, onSaveScore }: GameOverProps) {
  const [saved, setSaved] = useState(false)

  const handleSave = (name: string) => {
    onSaveScore(name)
    setSaved(true)
  }

  return (
    <section className="game-over">
      <h2>¡Fin de la partida!</h2>

      <p>
        <span>Palabras encadenadas:</span> <strong>{wordsCount}</strong>
      </p>

      <p>
        <span>Puntaje final:</span> <strong>{score}</strong>
      </p>

      {saved ? (
        <p className="success-message">Puntaje guardado correctamente</p>
      ) : (
        <SaveScoreForm onSave={handleSave} />
      )}

      <button type="button" className="secondary" onClick={onReset}>
        Jugar nuevamente
      </button>
    </section>
  )
}
