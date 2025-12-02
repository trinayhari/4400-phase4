const API_BASE_URL = 'http://localhost:8000'

export async function fetchView(viewName: string) {
  const response = await fetch(`${API_BASE_URL}/api/views/${viewName}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${viewName}`)
  }
  return response.json()
}

export async function callProcedure(endpoint: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  const result = await response.json()
  
  if (!response.ok) {
    throw new Error(result.detail || 'Request failed')
  }
  
  return result
}

