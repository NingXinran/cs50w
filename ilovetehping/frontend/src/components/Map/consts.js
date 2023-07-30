export const center = {
    lat: 1.3489523569614084, 
    lng: 103.83822973995949
}
export const mapOptions = {
    mapId: process.env.REACT_APP_MAP_ID,
    center: center,
    zoom: 15,
    disableDefaultUI: true
}

export const containerStyle = {
    width: '100%',
    height: '50vh',
}
export const mapStyle = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ff7000"
            },
            {
                "lightness": "69"
            },
            {
                "saturation": "100"
            },
            {
                "weight": "1.17"
            },
            {
                "gamma": "2.04"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#cb8536"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#ffb471"
            },
            {
                "lightness": "66"
            },
            {
                "saturation": "100"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-8"
            },
            {
                "gamma": "0.98"
            },
            {
                "weight": "2.45"
            },
            {
                "saturation": "26"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            },
            {
                "color": "#ecc080"
            }
        ]
    }
]
export const pinsData = [
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