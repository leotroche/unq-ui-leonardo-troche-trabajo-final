import { useReducer, useState } from 'react'

import { gameReducer, initialState } from '../reducers/gameReducer'
import { checkWordExists } from '../services/wordService'
import { isWordUsed, followsChain } from '../utils/gameValidations'
import { normalizeWord } from '../utils/normalizeWord'
import { useTimer } from './useTimer'

export function useGame() {
  const [game, dispatch] = useReducer(gameReducer, initialState)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useTimer({
    enabled: game.status === 'PLAYING',
    onTick: () => dispatch({ type: 'TICK' }),
  })

  const handleSubmit = async (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const word = normalizeWord(value)
    if (!word) return

    if (game.status === 'IDLE') {
      dispatch({ type: 'START_GAME' })
    }

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

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' })
    setValue('')
  }

  return {
    game,
    value,
    isLoading,
    handleSubmit,
    handleChange,
    handleRestart,
  }
}
