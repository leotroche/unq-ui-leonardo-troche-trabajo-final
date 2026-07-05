import { useReducer, useState } from 'react'

import { gameReducer, initialState } from './reducers/gameReducer'
import { checkWordExists } from './services/wordService'
import { followsChain, isWordUsed } from './utils/gameValidations'
import { normalizeWord } from './utils/normalizeWord'

export function App() {
  const [game, dispatch] = useReducer(gameReducer, initialState)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const word = normalizeWord(value)
    if (!word) return

    if (isWordUsed(word, game.words)) {
      dispatch({ type: 'SET_ERROR', payload: 'ALREADY_USED' })
      return
    }

    if (!followsChain(word, game.words)) {
      dispatch({ type: 'SET_ERROR', payload: 'INVALID_CHAIN' })
      return
    }

    setIsLoading(true)

    try {
      const exists = await checkWordExists(word)

      if (!exists) {
        dispatch({ type: 'SET_ERROR', payload: 'INVALID_WORD' })
        return
      }

      dispatch({ type: 'ADD_WORD', payload: word })
      setValue('')
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'SERVER_ERROR' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  return (
    <main className="container">
      <h1>Palabras Encadenadas</h1>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px' }}>
        <input
          name="word"
          type="text"
          placeholder="Escribe una palabra"
          value={value}
          onChange={handleChange}
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-describedby="word-helper"
          aria-invalid={game.error ? 'true' : undefined}
        />

        {game.error && (
          <small id="word-helper" style={{ minHeight: '1.5rem' }}>
            {errorMessages[game.error]}
          </small>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Validando...' : 'Enviar'}
        </button>
      </form>
    </main>
  )
}

const errorMessages = {
  ALREADY_USED: 'Palabra repetida',
  INVALID_CHAIN: 'No encadena con la anterior',
  INVALID_WORD: 'Palabra no encontrada',
  SERVER_ERROR: 'Error de red. Intenta nuevamente.',
} as const
