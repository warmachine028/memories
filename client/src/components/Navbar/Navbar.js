import React, { useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import { useDispatch } from "react-redux";
import useStyles from './styles';
import memories from "../../images/memories.png";
import icon from "../../images/icon.png";

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

        // JWT
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2"></Typography>
                <img className={classes.image} src={icon} alt="memories" height="60" />
                <img className={classes.image} src={memories} alt="memories" height="100"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;