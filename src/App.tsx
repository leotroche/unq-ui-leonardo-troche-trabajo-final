import { useReducer, useState } from 'react'

import { GameOver } from './components/GameOver'
import { GameStats } from './components/GameStats'
import { LeaderboardDialog } from './components/LeaderboardDialog'
import { WordForm } from './components/WordForm'
import { WordList } from './components/WordList'
import { useLeaderboard } from './hooks/useLeaderboard'
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

  const { scores, saveScore } = useLeaderboard()

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

  const handleSaveScore = (name: string) => {
    saveScore({ name, score: game.score, words: game.words.length })
  }

  const isGameOver = game.status === 'GAME_OVER'
  const lastWord = game.words[game.words.length - 1]

  return (
    <div className="container layout">
      <header className="header">
        <GameStats score={game.score} timeLeft={game.timeLeft} />

        <button
          type="button"
          className="secondary"
          disabled={game.status === 'PLAYING'}
          onClick={() => setIsLeaderboardOpen(true)}
        >
          Tabla de posiciones
        </button>
      </header>

      <main className="main">
        {isGameOver ? (
          <GameOver
            score={game.score}
            wordsCount={game.words.length}
            onRestart={handleRestart}
            onSaveScore={handleSaveScore}
          />
        ) : (
          <WordForm
            value={value}
            error={game.error}
            lastWord={lastWord}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </main>

      <footer className="footer">
        <p>Palabras ingresadas</p>
        <WordList words={game.words} />
      </footer>

      <LeaderboardDialog
        open={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        scores={scores}
      />
    </div>
  )
}
