import { styled } from "@mui/material/styles"

const PREFIX = "Posts"
export const classes = {
    root: `${PREFIX}-root`,
    mainContainer: `${PREFIX}-mainContainer`,
    smMargin: `${PREFIX}-smMargin`,
    actionDiv: `${PREFIX}-actionDiv`,
}

export const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: "flex",
        justifyContent: "center",
        minHeight: 150,
        alignItems: "center",
    },
    [`& .${classes.mainContainer}`]: {
        display: "flex",
        alignItems: "center",
    },
    [`& .${classes.smMargin}`]: {
        margin: theme.spacing(1),
    },
    [`& .${classes.actionDiv}`]: {
        textAlign: "center",
    },
}))

export default Root
