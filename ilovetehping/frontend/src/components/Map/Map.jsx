import { Wrapper } from "@googlemaps/react-wrapper"
import { useRef, useEffect, useState } from "react"
import { containerStyle, center, mapStyle } from './consts.js'
import { createRoot } from "react-dom/client"
import axios from "axios"

export default function Map() {
    return (
    <Wrapper 
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        version="beta"
        libraries={["marker"]}
    >
        <MyMap />
    </Wrapper>)
}

function MyMap() {
    const [map, setMap] = useState();
    const ref = useRef();  // mutable place to put data that does not trigger rerender, ie not watched

    useEffect(() => {
        setMap(new window.google.maps.Map(
            ref.current, 
            mapOptions
        ))
    }, []);

    return <>
        <div ref={ref} id="map"/>
        {map && <TehPins map={map}/>}
    </>
}

const mapOptions = {
    mapId: process.env.REACT_APP_MAP_ID,
    center: center,
    zoom: 15,
    disableDefaultUI: true
}

const pinsData = [
    {
        "name": "The Daily Cup",
        "user": 1,
        "zipcode": 570282,
        "address": "282 Bishan Street 22, #01-105, Bishan North Shopping Mall, Singapore 570282",
        "latitude": 1.3587806625045427,
        "longitude": 2.010384465405471,
        "image": "daily-cup-storefront.jpeg",
        "description": "",
        "price": 2,
        "timestamp": "2023-07-29T07:53:25.692438Z"
    },
    {
        "name": "Ya Kun Kaya Toast @ Junction8",
        "user": 1,
        "zipcode": 579837,
        "address": "9 Bishan Pl, #B1-26, Singapore 579837",
        "latitude": 1.3510478643805137,
        "longitude": 103.84875952424673,
        "image": "",
        "description": "",
        "price": 2,
        "timestamp": "2023-07-29T07:59:37.841743Z"
    },
    {
        "name": "Sample shop 3",
        "user": 1,
        "zipcode": 123456,
        "address": "9 Bishan Pl, #B1-26, Singapore 579837",
        "latitude": 1.0,
        "longitude": 103.0,
        "image": "",
        "description": "",
        "price": 1,
        "timestamp": "2023-07-29T08:33:51.896813Z"
    }
]

function TehPins({map}) {
    const [pins, setPins] = useState(pinsData)  // set initial value

    return <>{
        pins.map( pin =>
            <Marker
                map = {map}
                position={{lat: pin.latitude, lng: pin.longitude}}
            >
                <div>
                    <h2>
                        pin.name
                    </h2>
                </div>
            </Marker>
        )
    }</>
}

function Marker({map, children, position}) {
    const markerRef = useRef();
    const rootRef = useRef();
 
    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement("div");
            rootRef.current = createRoot(container);

            markerRef.current = new google.maps.marker.AdvancedMarkerView({
                position,
                content: container
            });
        }
    }, [])
}