import type { ChangeEventHandler, SubmitEventHandler } from 'react'

import type { GameError } from '../reducers/gameReducer'

interface WordFormProps {
  value: string
  error: GameError | null
  lastWord?: string
  isLoading: boolean
  disabled: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

const errorMessages: Record<GameError, string> = {
  ALREADY_USED: 'Palabra repetida',
  INVALID_CHAIN: 'No encadena con la anterior',
  INVALID_WORD: 'Palabra no encontrada',
  SERVER_ERROR: 'Error de red. Intenta nuevamente.',
}

export function WordForm({
  value,
  error,
  lastWord,
  isLoading,
  disabled,
  onChange,
  onSubmit,
}: WordFormProps) {
  const isDisabled = disabled || isLoading

  return (
    <form onSubmit={onSubmit} className="word-form">
      <p>
        Última palabra: <strong>{lastWord ?? '—'}</strong>
      </p>

      <fieldset role="group">
        <input
          name="word"
          type="text"
          placeholder="Escribe una palabra"
          value={value}
          onChange={onChange}
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby="word-helper"
          aria-invalid={error ? true : undefined}
          disabled={isDisabled}
        />

        <button type="submit" disabled={isDisabled}>
          {isLoading ? 'Validando...' : 'Enviar'}
        </button>
      </fieldset>

      <small id="word-helper" className="word-helper">
        {error ? errorMessages[error] : null}
      </small>
    </form>
  )
}
