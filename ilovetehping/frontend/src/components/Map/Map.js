import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import GoogleMapReact from 'google-map-react'
import { center, mapOptions, pinsData } from './consts'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const Map = () => {
    const [tehpins, setTehPins] = useState(pinsData);

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
        <div style={{ height: '40vh', width: '80%' }} className='p-4 mx-auto'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={center}
                defaultZoom={13}
                options={mapOptions}
            >
                {
                    tehpins.map(pin => {
                        return (
                            <Marker key={pin.name} lat={pin.latitude} lng={pin.longitude} pin={pin} />
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    )
}

const Marker = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <img style={{ width: 50, height: 50, cursor: 'default' }} src="iced-tea.png" alt="teh-pin" onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Edit this Teh Pin
                </Modal.Header>
                <Modal.Body>
                    <EditTehPin pin={props.pin} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )

}

const EditTehPin = props => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="edit.shopName">
                <Form.Label>Name of Teh Pin</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={props.pin.name}
                    disabled
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopZipcode"
            >
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={props.pin.zipcode}
                    autoFocus
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopAddress"
            >
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={props.pin.address}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopDescription"
            >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form>
    )

}

export default Map;

