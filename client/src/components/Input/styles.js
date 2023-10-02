import { styled } from "@mui/material/styles"

const PREFIX = "Search"
export const classes = {
    root: `${PREFIX}-root`,
    searchBarLight: `${PREFIX}-searchBarLight`,
    searchBarDark: `${PREFIX}-searchBarDark`,
    searchButton: `${PREFIX}-searchButton`,
    chip: `${PREFIX}-chip`,
}

export const Root = styled("div")(({ theme }) => ({
    [`& .${classes.searchBarLight}`]: {
        display: "flex",
        borderRadius: "5px",
        backgroundColor: "rgba(255, 255, 255, .09)",
    },
    [`& .${classes.searchBarDark}`]: {
        backgroundColor: "rgba(5, 5, 5, .90)",
        '& .MuiOutlinedInput-root': {
			'& fieldset': {
                borderColor: '#b3b3b3',
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.palette.primary.main,
			},
		},
    },
}))

export default Root
