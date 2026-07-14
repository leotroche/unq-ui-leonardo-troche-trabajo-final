import { useState } from 'react'

import { GameOver } from './components/GameOver'
import { GameStats } from './components/GameStats'
import { LeaderboardDialog } from './components/LeaderboardDialog'
import { WordForm } from './components/WordForm'
import { WordList } from './components/WordList'
import { useGame } from './hooks/useGame'
import { useLeaderboard } from './hooks/useLeaderboard'

export function App() {
  const { game, word, isLoading, handleChange, handleSubmit, handleReset } = useGame()

  const { scores, saveScore } = useLeaderboard()

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)

  const handleSaveScore = (name: string) => {
    saveScore({
      name,
      score: game.score,
      words: game.words.length,
    })
  }

  const isGameOver = game.status === 'GAME_OVER'
  const lastWord = game.words[game.words.length - 1]
  const hasWords = game.words.length > 0

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
        <h1 className="title">🔗 Palabras Encadenadas 🔗</h1>

        {isGameOver ? (
          <GameOver
            score={game.score}
            wordsCount={game.words.length}
            onReset={handleReset}
            onSaveScore={handleSaveScore}
          />
        ) : (
          <WordForm
            value={word}
            error={game.error}
            lastWord={lastWord}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </main>

      <footer className="footer">{hasWords && <WordList words={game.words} />}</footer>

      <LeaderboardDialog
        open={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        scores={scores}
      />
    </div>
  )
}
