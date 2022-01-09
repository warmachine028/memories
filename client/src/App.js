import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";
import icon from "./images/icon.png";
import useStyles from "./styles";

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Container maxwidth="lg">
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography className={classes.heading} variant="h2">
					<img className={classes.image} src={memories} alt="memories" height="100" />
				</Typography>
				
			</AppBar>

			<Grow in>
				<Container>
					<Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
						<Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId} /></Grid>
						<Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId} /></Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
