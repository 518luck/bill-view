import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  savedCredentials: {
    account: string
    password: string
  } | null
  rememberPassword: boolean

  setToken: (token: string) => void
  clearToken: () => void

  setCredentials: (account: string, password: string) => void
  getSavedCredentials: () => { account: string; password: string } | null
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

      setCredentials: (account, password) =>
        set({
          savedCredentials: { account, password },
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
