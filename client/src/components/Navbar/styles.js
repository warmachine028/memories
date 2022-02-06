import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: "30px 0",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 50px",
		backgroundColor: "rgba(69, 114, 200)",

		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	heading: {
		color: theme.palette.primary.main,
		textDecoration: "none",
		fontSize: "2em",
		fontWeight: 300,
	},
	image: {
		marginLeft: "10px",
		marginTop: "5px",
	},
	toolbar: {
		display: "flex",
		justifyContent: "flex-end",
		width: "400px",
		[theme.breakpoints.down("sm")]: {
			width: "auto",
		},
	},
	profile: {
		display: "flex",
		justifyContent: "space-between",
		width: "400px",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			width: "auto",
			marginTop: 20,
			justifyContent: "center",
		},
	},
	logout: {

	},
	userName: {
		display: "flex",
		textAlign: 'center',
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			width: "max-content",
			maxWidth: "123px",
			alignItems: "center",
			padding: "0 20px 0 20px",
		},
	},
	brandContainer: {
		display: "flex",
		alignItems: "center",
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
}));
