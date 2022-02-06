import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	appBarSearch: {
		borderRadius: 4,
		marginBottom: "1rem",
		display: "flex",
		padding: theme.spacing(2),
		"& .MuiTextField-root": {
			marginBottom: theme.spacing(1),
		},
	},
	pagination: {
		borderRadius: 4,
		marginTop: "1rem",
		padding: "16px",
	},
	gridContainer: {
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	buttonSearch: {
		marginTop: 10,
	},
}));

// import { makeStyles } from "@material-ui/core/styles";

// export default makeStyles((theme) => ({
// 	appBar: {
// 		borderRadius: 15,
// 		margin: "30px 0",
// 		display: "flex",
// 		flexDirection: "row",
// 		justifyContent: "center",
// 		backgroundColor: "rgba(69, 114, 200)",
// 	},
// 	heading: {
// 		color: "rgba(0, 183, 255, 1)",
// 	},
// 	image: {
// 		marginLeft: "15px",
// 		paddingRight: "15px",
// 		alignSelf: "left",
// 	},
// 	[theme.breakpoints.down("sm")]: {
// 		mainContainer: {
// 			flexDirection: "column-reverse",
// 		},
// 	},
// }));
