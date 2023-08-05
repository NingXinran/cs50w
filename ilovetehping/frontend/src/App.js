import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import Map from './components/Map/Map';


const App = () => {

    const [tehpins, setTehPins] = useState([]);

    useEffect(() => {
        axios
            .get("/api/shops")
            .then(res => {
                console.log(res.data)
                setTehPins(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Header />
            <Map tehpins={tehpins} setTehPins={setTehPins}/>
        </div>
    )
}

export default App;