import React from "react"
import { Root, classes } from "./styles"
import { Typography } from "@mui/material"

const PrivateSwitch = ({ private_, postData, setPrivate, setPostData }) => {
    const onChange = () => setPostData({ ...postData, _private: !private_ })
    console.log(private_)
    return (
        <Root className={classes.root}>
            <label className={classes.formSwitch}>
                <input className={classes.input} type="checkbox" checked={private_} onClick={() => setPrivate(!private_)} onChange={onChange} />
                <i className={classes.i}></i>
                <Typography fontSize={15} style={{ color: "white" }}>Private</Typography>
            </label>
        </Root>
    )
}

export default PrivateSwitch
