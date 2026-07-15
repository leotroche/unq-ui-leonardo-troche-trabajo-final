import { useReducer, useState } from 'react'

import { gameReducer, initialState } from '../reducers/gameReducer'
import { checkWordExists } from '../services/wordService'
import { isWordUsed, followsChain } from '../utils/gameValidations'
import { normalizeWord } from '../utils/normalizeWord'
import { useTimer } from './useTimer'

export function useGame() {
  const [game, dispatch] = useReducer(gameReducer, initialState)
  const [word, setWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // --------------------------------------------------------------------------------

  useTimer({
    enabled: game.status === 'PLAYING',
    onTick: () => dispatch({ type: 'TICK' }),
  })

  // --------------------------------------------------------------------------------

  const handleSubmit = async (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (isLoading) return

    const normalizedWord = normalizeWord(word)
    if (!normalizedWord) return

    if (isWordUsed(normalizedWord, game.words)) {
      dispatch({ type: 'SET_ERROR', payload: 'ALREADY_USED' })
      return
    }

    if (!followsChain(normalizedWord, game.words)) {
      dispatch({ type: 'SET_ERROR', payload: 'INVALID_CHAIN' })
      return
    }

    setIsLoading(true)

    try {
      const exists = await checkWordExists(normalizedWord)

      if (!exists) {
        dispatch({ type: 'SET_ERROR', payload: 'INVALID_WORD' })
        return
      }

      dispatch({ type: 'ADD_WORD', payload: normalizedWord })
      setWord('')
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'SERVER_ERROR' })
    } finally {
      setIsLoading(false)
    }
  }

  // --------------------------------------------------------------------------------

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWord(evt.target.value)

    if (game.error) {
      dispatch({ type: 'CLEAR_ERROR' })
    }
  }

  // --------------------------------------------------------------------------------

  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' })
    setWord('')
  }

  // --------------------------------------------------------------------------------

  return {
    game,
    word,
    isLoading,
    handleSubmit,
    handleChange,
    handleReset,
  }
}
