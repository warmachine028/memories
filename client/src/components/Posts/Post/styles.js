import { styled } from "@mui/material/styles"
    
const PREFIX = "Post"
export const classes = {
    root: `${PREFIX}-root`,
    media: `${PREFIX}-media`,
    border: `${PREFIX}-border`,
    fullHeightCard: `${PREFIX}-fullHeightCard`,
    card: `${PREFIX}-card`,
    overlay: `${PREFIX}-overlay`,
    overlay2: `${PREFIX}-overlay2`,
    grid: `${PREFIX}-grid`,
    tags: `${PREFIX}-tags`,
    details: `${PREFIX}-details`,
    title: `${PREFIX}-title`,
    cardAction: `${PREFIX}-cardAction`,
    cardActions: `${PREFIX}-cardActions`,
    privateLabel: `${PREFIX}-privateLabel`,
}

export const Root = styled("div")({
    [`&.${classes.root}`]: {
        height: "100%",
    },
    [`& .${classes.media}`]: {
        height: 0,
        paddingTop: "56.25%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
    },
    [`& .${classes.card}`]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 5,
        height: "100%",
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, .09)",
        backdropFilter: "blur(10px)",
    },
    [`& .${classes.overlay}`]: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    [`& .${classes.overlay2}`]: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    [`& .${classes.grid}`]: {
        display: "flex",
    },
    [`& .${classes.tags}`]: {
        display: "flex",
        justifyContent: "space-between",
        margin: 20,
    },
    [`& .${classes.details}`]: {
        display: "flex",
        flexDirection: "column",
    },
    [`& .${classes.title}`]: {
        padding: "0 16px",
    },
    [`& .${classes.cardActions}`]: {
        padding: "0 16px 8px 16px",
        display: "flex",
        justifyContent: "space-between",
    },
    [`& .${classes.cardAction}`]: {
        display: "block",
        textAlign: "initial",
    },
    [`& .${classes.privateLabel}`]: {
        backgroundColor: "#00b5ff",
        align:"center"
    },
})

export default Root
