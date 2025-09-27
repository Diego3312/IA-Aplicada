/**
 * API Service Configuration
 * 
 * Centralizes all API communication for the Aurora application.
 * Uses environment variables or falls back to proxy configuration in development.
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ===== TYPE DEFINITIONS =====

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  version: string;
  environment: string;
}

export interface TestDataItem {
  id: number;
  name: string;
  date: string;
}

export interface TestResponse {
  message: string;
  data: TestDataItem[];
  requestInfo: {
    method: string;
    path: string;
    timestamp: string;
  };
}

// ===== API ERROR HANDLING =====

class ApiError extends Error {
  status?: number;
  endpoint?: string;

  constructor(
    message: string,
    status?: number,
    endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

// ===== API SERVICE =====

export const apiService = {
  /**
   * Generic fetch wrapper with error handling
   */
  async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      console.log(`API Request: ${options?.method || 'GET'} ${url}`);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      console.log(`API Success: ${endpoint}`, data);
      return data;
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error instanceof ApiError ? error : new ApiError(`Network error: ${error}`);
    }
  },

  /**
   * Check API health status
   */
  async checkHealth(): Promise<HealthResponse> {
    return this.fetchApi<HealthResponse>('/health');
  },

  /**
   * Get test data for connectivity verification
   */
  async getTestData(): Promise<TestResponse> {
    return this.fetchApi<TestResponse>('/health/test');
  }
};