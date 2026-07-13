interface WordListProps {
  words: string[]
}

export function WordList({ words }: WordListProps) {
  return (
    <section className="word-list">
      <h2>Palabras ingresadas</h2>

      <ul>
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </section>
  )
}
