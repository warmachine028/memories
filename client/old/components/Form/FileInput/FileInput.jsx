import imageCompression from 'browser-image-compression'
import { Button, Collapse } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Root, classes } from './styles'

export const compress = async (postData, setPostData, setFileName, setMedia, e) => {
	const imageFile = e.dataTransfer?.files[0] || e.target?.files[0]
	setMedia(null)
	try {
		console.log(`Original File Size ${imageFile.size / (1024 * 1024)} Mb`) 
		const compressedFile = await imageCompression(imageFile, { maxSizeMB: 1, maxWidthOrHeight: 1920 })
		const base64 = await imageCompression.getDataUrlFromFile(compressedFile)
		
		console.log('Image Compressed', Math.round((base64.length - 'data:image/jpeg;base64,'.length) * 0.75) / 1024 /1024, 'Mb') 
		const thumbnailFile = await imageCompression(imageFile, { maxSizeMB: 100 / 1024, maxWidthOrHeight: 800 })
		const thumbnail = await imageCompression.getDataUrlFromFile(thumbnailFile)
		console.log('Thumbnail',  Math.round((thumbnail.length - 'data:image/jpeg;base64,'.length) * 0.75) / 1024, 'KB') 
		
		setPostData({ ...postData, image: base64, thumbnail })
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
