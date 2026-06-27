const API_URL = 'https://word-api-hmlg.vercel.app/api/validate'

interface ApiResponse {
  exists: boolean
}

export async function checkWordExists(word: string): Promise<boolean> {
  const response = await fetch(`${API_URL}?word=${encodeURIComponent(word)}`)

  if (response.status === 400) {
    throw new Error('INVALID_REQUEST')
  }

  if (!response.ok) {
    throw new Error('NETWORK_ERROR')
  }

  const data: ApiResponse = await response.json()
  return data.exists
}
