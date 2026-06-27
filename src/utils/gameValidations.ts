export function isWordUsed(word: string, words: string[]): boolean {
  return words.includes(word)
}

export function followsChain(word: string, words: string[]): boolean {
  if (words.length === 0) return true

  const lastWord = words[words.length - 1]
  const expectedLetter = lastWord[lastWord.length - 1]

  return word.startsWith(expectedLetter)
}
