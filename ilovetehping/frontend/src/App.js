import React from 'react';
import { Button } from 'react-bootstrap';

import Header from './components/Header/Header';
import Map from './components/Map/Map';
import PinDetails from './components/PinDetails/PinDetails';

const App = () => {

    return (
        <div>
            <h1>ilovetehping!</h1>
            {/* <Header /> */}
            <Map lat={1} lng={103}/>
            {/* <PinDetails /> */}
        </div>
    )
}

export default App;