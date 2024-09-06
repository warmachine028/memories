import { Root, classes } from './styles'
import { Typography } from '@mui/material'
import { ModeContext } from '../../../contexts/ModeContext'
import { useContext } from 'react'

const PrivateSwitch = ({ private_, postData, setPrivate, setPostData }) => {
	const onChange = () => setPostData({ ...postData, private: !private_ })
	const { mode } = useContext(ModeContext)

	return (
		<Root className={classes.root}>
			<label className={`${classes.formSwitch} ${mode === 'dark' && classes.darkMode}`}>
				<input className={classes.input} type="checkbox" checked={private_} onClick={() => setPrivate(!private_)} onChange={onChange} />
				<i className={classes.i} />
			</label>
			<Typography fontSize={15} style={{ color: 'white' }}>
				Private
			</Typography>
		</Root>
	)
}

export default PrivateSwitch
