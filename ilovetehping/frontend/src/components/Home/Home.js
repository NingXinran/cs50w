import React, { useEffect, useState} from "react";
import axios from "axios";

import Map from "../Map/Map";
import Header from "../Header/Header"

const Home = () => {
    const [tehpins, setTehPins] = useState([]);
    const [filteredTP, setFilteredTP] = useState([])

    useEffect(() => {
        axios
            .get("/api/shops")
            .then(res => {
                console.log(res.data)
                setTehPins(res.data)
                setFilteredTP(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Header />
            <Map 
                tehpins={tehpins} setTehPins={setTehPins}
                filteredTP={filteredTP} setFilteredTP={setFilteredTP}
            />
        </div>
    )
}

export default Home;