import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  signingUpEmail: null,
  setSigningUpEmail: (signingUpEmail) => set({ signingUpEmail }),
}))

export default useAuthStore;
