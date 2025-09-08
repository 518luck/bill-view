import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  savedCredentials: {
    username: string
    password: string
  } | null
  rememberPassword: boolean

  setToken: (token: string) => void
  clearToken: () => void

  setCredentials: (username: string, password: string) => void
  getSavedCredentials: () => { username: string; password: string } | null
  setRememberPassword: (remember: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      savedCredentials: null,
      rememberPassword: false,

      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),

      setCredentials: (username, password) =>
        set({
          savedCredentials: { username, password },
          rememberPassword: true,
        }),
      getSavedCredentials: () => get().savedCredentials,
      setRememberPassword: (remember) => set({ rememberPassword: remember }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
