import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Translator from './components/Translator/Translator';

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/translator",
            element: <Translator />
        }
    ]
    )

    return (
        <div className="App">
            <Header />
            <RouterProvider router={router} />
        </div>
    )
    
}

export default App;