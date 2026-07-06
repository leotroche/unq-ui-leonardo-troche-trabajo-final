import { useReducer, useState } from 'react'

import { GameOver } from './components/GameOver'
import { GameStats } from './components/GameStats'
import { LeaderboardModal } from './components/LeaderboardModal'
import { WordForm } from './components/WordForm'
import { WordList } from './components/WordList'
import { useTimer } from './hooks/useTimer'
import { gameReducer, initialState } from './reducers/gameReducer'
import { checkWordExists } from './services/wordService'
import { followsChain, isWordUsed } from './utils/gameValidations'
import { normalizeWord } from './utils/normalizeWord'

export function App() {
  const [game, dispatch] = useReducer(gameReducer, initialState)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)

  useTimer({
    enabled: game.status === 'PLAYING',
    onTick: () => dispatch({ type: 'TICK' }),
  })

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

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' })
    setValue('')
  }

  return (
    <main className="container">
      <h1>Palabras Encadenadas</h1>

      <button onClick={() => setIsLeaderboardOpen(true)}>Ver leaderboard</button>

      <WordList words={game.words} />

      <GameStats status={game.status} score={game.score} timeLeft={game.timeLeft} />

      <WordForm
        value={value}
        error={game.error}
        isLoading={isLoading}
        disabled={game.status === 'GAME_OVER'}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {game.status === 'GAME_OVER' && (
        <GameOver score={game.score} wordsCount={game.words.length} onRestart={handleRestart} />
      )}

      <LeaderboardModal
        open={isLeaderboardOpen}
        scores={[]}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </main>
  )
}
