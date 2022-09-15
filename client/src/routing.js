//This is where we build the different states

import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/signup.components"
import Login from "./components/login.components"

//Import All the different States
// import Name from "./path/to/file";

const Routing = () => {

    return (

        <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
{/* 
            <Route exact path="/" element={<Welcome />} />

            <Route path="/watch">
                <Route exact path=":id" element={<VideoPage />} />
            </Route> */}

        </Routes>

    )
}
export default Routing;