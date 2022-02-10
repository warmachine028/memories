import React, {useState} from "react"
import PostDetails from "../components/PostDetails/PostDetails"
import Navbar from "../components/Navbar/Navbar"
import Home from "../components/Home/Home"
import Auth from "../components/Auth/Auth"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { classes, Root } from "./styles"
// import { user } from "../temp"

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    return (
        <Root className={classes.root}>
            <div className={classes.blur}>
                <BrowserRouter>
                    <Navbar user={user} setUser={setUser} />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home user={user}/>} />
                        <Route path="/posts/search" element={<Home user={user} />} />
                        <Route path="/posts/:id" element={<PostDetails user={user}/>} />
                        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Root>
    )
}

export default App
