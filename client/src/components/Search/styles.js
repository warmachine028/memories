import { styled } from "@mui/material/styles"

const PREFIX = "Search"
export const classes = {
    root: `${PREFIX}-root`,
    searchBar: `${PREFIX}-searchBar`,
    searchButton: `${PREFIX}-searchButton`,
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

        "& .MuiChip-filled": {
            background: "#ffffff70",
        },
        marginTop: "15px",
    },
    [`& .${classes.searchBar}`]: {
        marginBottom: "1rem",
        display: "flex",
        padding: theme.spacing(2),
        borderRadius: "5px",
        backgroundColor: "rgba(255, 255, 255, .09)",
        backdropFilter: "blur(10px)",
    },

    [`& .${classes.searchButton}`]: {
        marginTop: 10,
    },

    [`& .${classes.chip}`]: {
        paddingBottom: "10px",
    },
}))

export default Root
