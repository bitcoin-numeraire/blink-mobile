// import { API_URL } from 'react-native-dotenv'

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: 'https://us-central1-galoyapp.cloudfunctions.net/',
  timeout: 5000
}