import React from "react"
import imageCompression from "browser-image-compression"
import { Button } from "@mui/material"
export const compress = async (postData, setPostData, setText, setMedia, e) => {
    const imageFile = e.target.files[0]
    try {
        const compressedFile = await imageCompression(imageFile, { maxSizeMB: 1, maxWidthOrHeight: 1920 })
        const base64 = await imageCompression.getDataUrlFromFile(compressedFile)
        await setPostData({ ...postData, selectedFile: base64 })
        setMedia(base64)
        setText(imageFile.name)
    } catch (error) {
        console.log(error.message)
    }
}

export const FileInput = ({ postData, setPostData, classes, title, setTitle, media, setMedia}) => {
    return (
        <div style={{ width: "-webkit-fill-available" }}>
            <div className={classes.fileInput}>
                <input type="file" accept="image/*" onChange={e => compress(postData, setPostData, setTitle, setMedia, e)} style={{ display: "none" }} id="raised-button-file" multiple={false} />
                <label htmlFor="raised-button-file">
                    <Button variant="outlined" className={classes.fileInputButton} size="small" component="span">
                        Choose A File
                    </Button>
                </label>
                <div className={classes.fileName} data-filetype={`.${title.split(".")[1]}`}>
                    <p>{title}</p>
                </div>
            </div>
            {media && <img className={classes.media || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} src={media} alt={title} />}
        </div>
    )
}

export default FileInput
