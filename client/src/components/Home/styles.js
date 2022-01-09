import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: "30px 0",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "rgba(69, 114, 200)",
	},
	heading: {
		color: "rgba(0, 183, 255, 1)",
	},
	image: {
		marginLeft: "15px",
		paddingRight: "15px",
		alignSelf: "left",
	},
	[theme.breakpoints.down("sm")]: {
		mainContainer: {
			flexDirection: "column-reverse",
		},
	},
}));
