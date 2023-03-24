import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
