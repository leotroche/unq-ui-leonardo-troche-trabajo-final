type GameError = 'USED' | 'CHAIN' | 'NOT_FOUND' | 'NETWORK'

interface GameState {
  words: string[]
  score: number
  error: GameError | null
}

type GameAction =
  | { type: 'ADD_WORD'; payload: string }
  | { type: 'SET_ERROR'; payload: GameError | null }

export const initialState: GameState = {
  words: [],
  score: 0,
  error: null,
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_WORD': {
      const word = action.payload
      return {
        ...state,
        words: [...state.words, word],
        score: state.score + word.length,
        error: null,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
