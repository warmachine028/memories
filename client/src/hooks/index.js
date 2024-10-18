import { useContext } from 'react'
import { ThemeContext } from '@/contexts'
import { api } from '@/api'

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = api
