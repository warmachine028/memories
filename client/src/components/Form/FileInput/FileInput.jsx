import imageCompression from 'browser-image-compression'
import { Button, Collapse } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Root, classes } from './styles'

export const compress = async (postData, setPostData, setFileName, setMedia, e) => {
	const imageFile = e.dataTransfer?.files[0] || e.target?.files[0]
	setMedia(null)
	try {
		const compressedFile = await imageCompression(imageFile, { maxSizeMB: 0.8, maxWidthOrHeight: 1920 })
		const base64 = await imageCompression.getDataUrlFromFile(compressedFile)
		setPostData({ ...postData, image: base64 })
		setMedia(base64)
		setFileName(imageFile.name)
	} catch (error) {
		alert(error.message)
		setFileName('No post selected')
	}
}

const defaultMedia = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
export const FileInput = ({ postData, setPostData, fileName, setFileName, media, setMedia, setEmpty }) => {
	return (
		<Root className={classes.root}>
			<div className={classes.fileInput}>
				<input type="file" accept="image/*" onChange={(e) => compress(postData, setPostData, setFileName, setMedia, e)} style={{ display: 'none' }} id="raised-button-file" multiple={false} />
				<label htmlFor="raised-button-file">
					<Button variant="outlined" className={classes.inputButton} size="small" component="span">
						Choose A {media ? 'new' : ''} File
					</Button>
				</label>
				<div className={classes.fileName}>
					<p>{fileName}</p>
				</div>
			</div>
			<Collapse in={media !== null} timeout={300} unmountOnExit sx={{ position: 'relative' }}>
				<img className={classes.media} src={media || defaultMedia} alt={fileName} />

				<Button id="delete-button" onClick={() => setEmpty()} style={{ bottom: '16px', right: '0px', position: 'absolute' }}>
					<DeleteIcon htmlFor="delete-button" sx={{ color: 'white' }} />
				</Button>
			</Collapse>
		</Root>
	)
}
