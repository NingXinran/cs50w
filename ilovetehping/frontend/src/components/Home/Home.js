import React, { useEffect, useState} from "react";
import axios from "axios";

import Callout from "./Callout";
import Map from "../Map/Map";

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
            <Callout/>
            <Map 
                tehpins={tehpins} setTehPins={setTehPins}
                filteredTP={filteredTP} setFilteredTP={setFilteredTP}
            />
        </div>
    )
}

export default Home;