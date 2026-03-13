import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => {
        // Enforce the requested hardcoded admin check
        if (userData.email === 'admin' && userData.password === 'pass123') {
           set({ 
             user: { id: 0, name: 'Admin User', role: 'admin', email: 'admin' }, 
             isAuthenticated: true 
           });
           return true;
        }
        
        // Default mock login (for testing non-admin)
        set({ user: userData, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
