import React, { useState } from "react"
import PostDetails from "../components/PostDetails/PostDetails"
import Navbar from "../components/Navbar/Navbar"
import Home from "../components/Home/Home"
import Auth from "../components/Auth/Auth"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { classes, Root } from "./styles"
// import user_ from "../temp"

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    return (
        <BrowserRouter>
            <Root className={classes.root}>
                <div className={classes.blur}>
                    <Navbar user={user} setUser={setUser} />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home user={user} />} />
                        <Route path="/posts/search" element={<Home user={user} />} />
                        <Route path="/posts/:id" element={<PostDetails user={user} />} />
                        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
                    </Routes>
                </div>
            </Root>
        </BrowserRouter>
    )
}

export default App
