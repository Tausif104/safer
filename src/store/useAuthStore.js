import { create } from "zustand";
import { persist } from "zustand/middleware";
import { subscriptionAPI } from "@/services/paymentService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      pharmacy: null,
      setPharmacy: (pharmacy) => set({ pharmacy }),
      subscription: null,
      setSubscription: (subscription) => set({ subscription }),
      token: null,
      setToken: (token) => set({ token }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      signingUpEmail: null,
      setSigningUpEmail: (signingUpEmail) => set({ signingUpEmail }),
      // Fetch subscription status
      fetchSubscription: async () => {
        const { user, token } = get();
        if (!user?.id || !token) return;

        try {
          const response = await subscriptionAPI.getUserSubscription(
            user.id,
            token
          );
          set({ subscription: response.data });
        } catch (error) {
          console.error("Error fetching subscription:", error);
          // Don't set subscription to null on error, keep existing data
        }
      },
      logout: () =>
        set({
          user: null,
          pharmacy: null,
          subscription: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
