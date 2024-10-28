import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
	persist(
		(set, get) => ({
			// Posts state and actions
			posts: [],
			setPosts: (posts) => set({ posts }),
			addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
			updatePost: (updatedPost) =>
				set((state) => ({
					posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
				})),
			removePost: (id) =>
				set((state) => ({
					posts: state.posts.filter((post) => post.id !== id)
				})),

			// Theme state and actions
			theme: 'system',
			setTheme: (theme) => set({ theme }),
			actualTheme: 'dark',
			setActualTheme: (actualTheme) => set({ actualTheme }),
			getCurrentTheme: () => {
				const state = get()
				return state.theme === 'system' ? state.actualTheme : state.theme
			},
			setThemeAndActual: (theme) => {
				set({ theme })
				if (theme !== 'system') {
					set({ actualTheme: theme })
				}
			},

			// Snackbar state and actions
			snackbar: {
				open: false,
				message: '',
				severity: 'info'
			},
			openSnackbar: (message, severity = 'info') => set({ snackbar: { open: true, message, severity } }),
			closeSnackbar: () => set((state) => ({ snackbar: { ...state.snackbar, open: false } })),

			// Pages state and actions
			pages: [],
			setPages: (pages) => set({ pages })
		}),
		{
			name: 'app-storage',
			// Only persist theme-related state
			partialize: (state) => ({
				theme: state.theme,
				actualTheme: state.actualTheme
			})
		}
	)
)
