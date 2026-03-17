import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { API_BASE_URL } from '@/utils/api'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          const data = await response.json()
          if (data.success) {
            set({ user: data.data.user, isAuthenticated: true, isLoading: false })
            return { success: true }
          } else {
            set({ error: data.message, isLoading: false })
            return { success: false, message: data.message }
          }
        } catch (error) {
          set({ error: 'Login failed. Please try again.', isLoading: false })
          return { success: false, message: 'Login failed' }
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          })
          const data = await response.json()
          if (data.success) {
            set({ user: data.data.user, isAuthenticated: true, isLoading: false })
            return { success: true }
          } else {
            set({ error: data.message, isLoading: false })
            return { success: false, message: data.message }
          }
        } catch (error) {
          set({ error: 'Registration failed. Please try again.', isLoading: false })
          return { success: false, message: 'Registration failed' }
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' })
        } catch (error) {
          console.error('Logout failed', error)
        } finally {
          set({ user: null, isAuthenticated: false })
        }
      },

      checkAuth: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/me`)
          const data = await response.json()
          if (data.success) {
            set({ user: data.data, isAuthenticated: true })
          } else {
            set({ user: null, isAuthenticated: false })
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
