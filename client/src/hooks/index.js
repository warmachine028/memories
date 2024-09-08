import { useCallback, useContext, useEffect, useRef } from 'react'
import { ModeContext, SnackbarContext, ThemeContext } from '../contexts'

export const useSnackbar = () => useContext(SnackbarContext)
export const useMode = () => useContext(ModeContext)
export const useTheme = () => useContext(ThemeContext)

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
  return ref.current
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
  const swipeForward = useCallback(() => {
    swipeableViewsRef.current.swipeForward()
  }, [swipeableViewsRef])

  const swipeBackward = useCallback(() => {
    swipeableViewsRef.current.swipeBackward()
  }, [swipeableViewsRef])

  useEffect(() => {
    ;(async function () {
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
    })()
  }, [idx, prevIdx, swipeBackward, swipeForward])
}
