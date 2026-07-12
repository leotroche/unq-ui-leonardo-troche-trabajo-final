import { useState } from 'react'

interface SaveScoreFormProps {
  onSave: (name: string) => void
}

export function SaveScoreForm({ onSave }: SaveScoreFormProps) {
  const [name, setName] = useState('')

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) return

    onSave(trimmedName)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset role="group">
        <input
          type="text"
          name="player-name"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nickname"
          maxLength={20}
        />

        <button type="submit" disabled={!name.trim()}>
          Guardar
        </button>
      </fieldset>
    </form>
  )
}
