import { useEffect, useRef, type ChangeEventHandler, type SubmitEventHandler } from 'react'

import type { GameError } from '../reducers/gameReducer'

interface WordFormProps {
  value: string
  error: GameError | null
  lastWord?: string
  isLoading: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

const errorMessages: Record<GameError, string> = {
  ALREADY_USED: 'Palabra repetida',
  INVALID_CHAIN: 'No encadena con la anterior',
  INVALID_WORD: 'Palabra no encontrada',
  SERVER_ERROR: 'Error de red. Intenta nuevamente.',
}

export function WordForm({ value, error, lastWord, isLoading, onChange, onSubmit }: WordFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const isButtonDisabled = isLoading || !value.trim()

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus()
    }
  }, [isLoading])

  return (
    <form onSubmit={onSubmit} className="word-form">
      <p>
        Última palabra: <strong>{lastWord ?? '—'}</strong>
      </p>

      <fieldset role="group">
        <input
          ref={inputRef}
          name="word"
          type="text"
          placeholder="Escribe una palabra"
          value={value}
          onChange={onChange}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby="word-helper"
          aria-invalid={error ? true : undefined}
          disabled={isLoading}
          maxLength={40}
        />

        <button type="submit" disabled={isButtonDisabled}>
          {isLoading ? 'Validando...' : 'Enviar'}
        </button>
      </fieldset>

      <small id="word-helper" className="word-helper">
        {error ? errorMessages[error] : null}
      </small>
    </form>
  )
}
