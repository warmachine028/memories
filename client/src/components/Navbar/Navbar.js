import React, { useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import { useDispatch } from "react-redux";
import useStyles from './styles';
import memories from "../../images/memories.png";
import icon from "../../images/icon.png";
import decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history("/");
        setUser(null);
    };
    useEffect(() => {
			const token = user?.token;
			if (token) {
				const decodedToken = decode(token);
				if (decodedToken.exp * 1000 < new Date().getTime()) logout();
			}
			// JWT
			setUser(JSON.parse(localStorage.getItem("profile")));
		}, [location, user?.token]);
    
    const userIsinAuth = location.pathname === '/auth';
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.logo} src={icon} alt="memories" height="60" />
                <img className={classes.heading} src={memories} alt="memories" height="100"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (!userIsinAuth && <Button className={classes.logout} component={Link} to="/auth" variant="contained">Sign In</Button>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;