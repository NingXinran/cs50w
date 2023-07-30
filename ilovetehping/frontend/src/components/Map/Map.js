import GoogleMapReact from 'google-map-react'
import { center, mapOptions } from './consts'
import { useEffect } from 'react'

const Map = props => {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={center}
                defaultZoom={15}
                options={mapOptions}
            >
                <Markers lat={props.lat} lng={props.lng}/>
            </GoogleMapReact>
        </div>
    )
}

const Markers = props => {
    return <h1>!!MY-MARKER!!</h1>
}

export default Map;

// useEffect(() => {
//     fetch("/api/shops")
//     .then(res => {
//         if(res.ok) {
//             res.json().then(data => setMarkers(data.map(pin =>
//                 <Marker
//                     name = {pin.name}
//                     lat = {pin.latitude}
//                     lng = {pin.longitude}
//                 />    
//             )))
//         } else {
//             res.json().then(err => console.log(err));
//         }
//     })
// }, [])