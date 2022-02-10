import { styled } from "@mui/material/styles"

const PREFIX = "Form"
export const classes = {
    root: `${PREFIX}-root`,
    textField: `${PREFIX}-textField`,
    paper: `${PREFIX}-paper`,
    form: `${PREFIX}-form`,
    fileInput: `${PREFIX}-fileInput`,
    fileInputButton: `${PREFIX}-fileInputButton`,
    fileName: `${PREFIX}-fileName`,
    buttonSubmit: `${PREFIX}-buttonSubmit`,
    privateSwitch: `${PREFIX}-privateSwitch`,
    chip: `${PREFIX}-chip`,
    media: `${PREFIX}-media`,
}

export const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0.5, 0),
        },
        "& .MuiFormLabel-root": {
            color: "white",
        },
        "& .MuiChip-filled": {
            background: "#ffffff70",
        },
    },
    [`& .${classes.textField}`]: {
        borderRadius: 4,
        marginBottom: "1rem",
        display: "flex",
        padding: theme.spacing(2),
        color: "white",
    },
    [`& .${classes.media}`]: {
        borderRadius: "5px",
        objectFit: "cover",
        width: "100%",
        maxHeight: "168px",
        aspectRatio: "1.77",
    },
    [`& .${classes.paper}`]: {
        padding: theme.spacing(2),
        backgroundColor: "rgba(255, 255, 255, .09)",
        backdropFilter: "blur(10px)",
        borderRadius: "5px",
    },
    [`& .${classes.form}`]: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    [`& .${classes.fileInputButton}`]: {
        background: "#ffffff63",
        color: "white",
        margin: "0 10px 5px 0",
        paddingBottom: "1px",
        align: "center",
        width: "124px",
    },
    [`& .${classes.fileName}`]: {
        position: "relative",
        width: "-webkit-fill-available",
    },

    [`& .${classes.fileName} p`]: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingRight: "0px",
        textOverflow: "ellipsis",
        position: "absolute",
        width: "inherit",
        bottom: "-27px",
    },
    [`& .${classes.fileInput}`]: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
        justifyContent: "flex-start",
    },
    [`& .${classes.privateSwitch}`]: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    [`& .${classes.buttonSubmit}`]: {
        marginTop: 10,
    },
    [`& .${classes.chip}`]: {
        margin: "5px 0",
    },
}))

export default Root
