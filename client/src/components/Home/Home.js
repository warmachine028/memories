import React, { useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import ChipInput from "material-ui-chip-input";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
    
}

const Home = () => {
    
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
	const query = useQuery();
	const history = useNavigate();
	const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
			//dispatch -> fetch search post
			if (search.trim() || tags)
            {
                dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
                history(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(',')}`);
            } else history("/");
		}


    const handleKeyPress = (e) => {
        if (e.keyCode === 13)
            searchPost();
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}><Posts setCurrentId={setCurrentId} /></Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                            <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChangeCapture={(e) => setSearch(e.target.value)}/>
                            <ChipInput value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined"/>
                            <Button className={classes.buttonSearch} onClick={searchPost} color="primary" variant="contained">SEARCH</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}><Pagination page={ page }/></Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;