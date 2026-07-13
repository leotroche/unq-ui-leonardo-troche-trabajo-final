import { useState } from 'react'

interface SaveScoreFormProps {
  onSave: (name: string) => void
}

export function SaveScoreForm({ onSave }: SaveScoreFormProps) {
  const [name, setName] = useState('')

  const trimmedName = name.trim()

  const disabled = trimmedName.length < 3

  const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (trimmedName.length < 3 || trimmedName.length > 20) {
      return
    }

    onSave(trimmedName)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="save-score-form">
      <label htmlFor="player-name">Guardá tu puntaje en la tabla de posiciones</label>

      <fieldset role="group">
        <input
          id="player-name"
          type="text"
          name="player-name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nickname"
          minLength={3}
          maxLength={20}
          required
        />

        <button type="submit" disabled={disabled}>
          Guardar
        </button>
      </fieldset>
    </form>
  )
}
