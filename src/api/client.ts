import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request Interceptor (placeholder for auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor (handles generic errors)
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
    return Promise.reject({
      message,
      code: error.response?.data?.code || error.code,
      errors: error.response?.data?.errors
    })
  }
)

export default apiClient
