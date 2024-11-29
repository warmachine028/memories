import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
	persist(
		(set, get) => ({
			theme: 'system',
			actualTheme: 'dark',
			setTheme: (theme) => set({ theme }),
			setActualTheme: (actualTheme) => set({ actualTheme }),
			getCurrentTheme: () => {
				const state = get()
				return state.theme === 'system'
					? state.actualTheme
					: state.theme
			},
			setThemeAndActual: (theme) => {
				set({ theme })
				if (theme !== 'system') {
					set({ actualTheme: theme })
				}
			},

			snackbar: { open: false, message: '', severity: 'info' },
			openSnackbar: (message, severity = 'info') =>
				set({ snackbar: { message, severity, open: true } }),
			closeSnackbar: () =>
				set((state) => ({
					snackbar: { ...state.snackbar, open: false }
				}))
		}),
		{
			name: 'app-storage',
			partialize: (state) => ({
				theme: state.theme,
				actualTheme: state.actualTheme
			})
		}
	)
)
