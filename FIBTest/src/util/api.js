import axios from 'redaxios'

const api = () => {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'X-FIB-API-LANGUAGE': 'en_GB',
      'X-FIB-API-AUTH-TYPE': 'exam',
      'X-FIB-API-AUTH-TOKEN': import.meta.env.VITE_AUTH_TOKEN
    }
  }

  const instance = axios.create(defaultOptions)
  return instance
}

export default api()
