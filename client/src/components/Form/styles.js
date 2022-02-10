import { styled } from "@mui/material/styles"

const PREFIX = "Form"
export const classes = {
    root: `${PREFIX}-root`,
    textField: `${PREFIX}-textField`,
    paper: `${PREFIX}-paper`,
    form: `${PREFIX}-form`,
    fileInput: `${PREFIX}-fileInput`,
    buttonSubmit: `${PREFIX}-buttonSubmit`,
    privateSwitch: `${PREFIX}-privateSwitch`,
    chip: `${PREFIX}-chip`,
}

export const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0.5, 0),
        },
        "& .MuiFormLabel-root": {
            color: "white",
        },
        "& .Form-fileInput": {
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
    [`& .${classes.fileInput}`]: {
        marginTop: 7,
        width: "100%",
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
