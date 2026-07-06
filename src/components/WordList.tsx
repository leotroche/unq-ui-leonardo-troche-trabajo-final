interface WordListProps {
  words: string[]
}

export function WordList({ words }: WordListProps) {
  return (
    <article>
      <h2>Palabras usadas</h2>

      <ul>
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </article>
  )
}
