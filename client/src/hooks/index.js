import { useContext } from 'react'
import { ThemeContext } from '@/contexts'

export const useTheme = () => {
	const context = useContext(ThemeContext)

	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}

export * from './posts'
export * from './users'
export * from './reactions'
export * from './comments'
