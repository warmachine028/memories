import { styled } from "@mui/material/styles"

const PREFIX = "Home"
export const classes = {
    appBarSearch: `${PREFIX}-appBarSearch`,
    pagination: `${PREFIX}-pagination`,
    gridContainer: `${PREFIX}-gridContainer`,
    buttonSearch: `${PREFIX}-buttonSearch`,
    container: `${PREFIX}-container`,
}
export const Root = styled("div")(({ theme }) => ({
    [`& .${classes.gridContainer}`]: {
        justifyContent:"space-between",
        alignItems:"stretch",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            padding: "0 0 0 10px",
        },
    },
    [`& .${classes.container}`]: {
        margin: "40px 0",
        maxWidth: "-webkit-fill-available",
        [theme.breakpoints.down(600)]: {
            margin: "40px 0",
            padding: "0 7px",
        },
    },
}))

export default Root
