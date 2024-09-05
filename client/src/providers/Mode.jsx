import { ModeContext } from '../contexts'
import { useState } from 'react'

const ModeProvider = ({ children }) => {
	const modes = { light, dark }
	const { light, dark } = modes
	const [mode, setMode] = useState(light)

	const toggleMode = () => setMode((prevMode) => (prevMode === light ? dark : light))

	const value = { mode, toggleMode }

	return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export default ModeProvider
