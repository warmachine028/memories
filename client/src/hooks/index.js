import { useContext, useEffect, useRef } from 'react'
import { ModeContext, ThemeContext } from '@/contexts'

export const useMode = () => useContext(ModeContext)
// export { useTheme } from './theme'
export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

/**
 * Returns the previous value of the state of a component
 * @param {any} Current value in component state
 * @returns Previous value in component state
 */
export const usePrevious = (value) => {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref
}

/**
 * Helper function to delay the program a number of ms
 * @param {Number} ms Wait time in ms
 * @returns a promise that is resolved after the time has passed
 */
const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Adds functionality to Swipeable component to be used with tabs
 * @param {RefObject} swipeableViewsRef Swipeable ref object
 * @param {Number} idx current index (zero based)
 */
export const useSwipe = (swipeableViewsRef, idx) => {
	const prevIdx = usePrevious(idx)
	const swipeForward = () => {
		swipeableViewsRef.current.swipeForward()
	}

	const swipeBackward = () => {
		swipeableViewsRef.current.swipeBackward()
	}

	useEffect(() => {
		const animate = async () => {
			if (prevIdx < idx) {
				for (let i = 0; i < idx - prevIdx; i++) {
					swipeForward()
					await sleep(300)
				}
			} else if (idx < prevIdx) {
				for (let i = 0; i < prevIdx - idx; i++) {
					swipeBackward()
					await sleep(300)
				}
			}
		}
		animate()
	}, [idx, prevIdx, swipeBackward, swipeForward])
}
