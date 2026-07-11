interface WordListProps {
  words: string[]
}

export function WordList({ words }: WordListProps) {
  return (
    <ul className="word-list">
      {words.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  )
}
