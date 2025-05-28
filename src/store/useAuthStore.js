import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      pharmacy: null,
      setPharmacy: (pharmacy) => set({ pharmacy }),
      token: null,
      setToken: (token) => set({ token }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      signingUpEmail: null,
      setSigningUpEmail: (signingUpEmail) => set({ signingUpEmail }),
      logout: () => set({ user: null, pharmacy: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
