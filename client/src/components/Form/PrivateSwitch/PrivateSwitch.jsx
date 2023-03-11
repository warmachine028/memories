import { Root, classes } from './styles'
import { Typography } from '@mui/material'

const PrivateSwitch = ({ private_, postData, setPrivate, setPostData }) => {
	const onChange = () => setPostData({ ...postData, private: !private_ })
	return (
		<Root className={classes.root}>
			<label className={classes.formSwitch}>
				<input className={classes.input} type="checkbox" checked={private_} onClick={() => setPrivate(!private_)} onChange={onChange} />
				<i className={classes.i}></i>
			</label>
			<Typography fontSize={15} style={{ color: 'white' }}>
				Private
			</Typography>
		</Root>
	)
}

export default PrivateSwitch
