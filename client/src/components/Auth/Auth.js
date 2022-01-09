import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const history = useNavigate();
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(formData, history))
		} else {
			dispatch(signin(formData, history));
		}
	};
	const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value });};
	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		handleShowPassword(false);
	};
	const googleSuccess = async (res) => {
		const result = res?.profileObj; // Undefined X cannot get property profileObj of undefined
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history('/');
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		console.log(error)
		console.log("Google Sign In was unsuccessful. Try Again Later");
	};

	return <Container component="main" maxWidth="xs">
		<Paper className={classes.paper} elevation={3}>
			<Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
			<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={1}>
					{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
								<Input name="lastName" label="Last Name" handleChange={handleChange} half/>
							</>
					)}
					<Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
					<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
					{ isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
				</Grid>
				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? "SIGN UP" : "SIGN IN"}</Button>
				<GoogleLogin clientId="851540640975-8gkbav5m3n6mto5hrmpvppf1v7un7jrl.apps.googleusercontent.com" render={
					(renderProps) => (
						<Button className={classes.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} color="primary" variant="contained" fullWidth>
							GOOGLE SIGN IN
						</Button>
					)}
					onSuccess={ googleSuccess }
					onFailure={ googleFailure }
					cookiePolicy="single_host_origin"
				/>
				<Grid container justifyContent="center">
					<Grid item>
						<Button onClick={switchMode}>{ isSignup ? "Already have an account? Sign In": "Don't have an account? Sign Up" }</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	</Container>;
};

export default Auth;
