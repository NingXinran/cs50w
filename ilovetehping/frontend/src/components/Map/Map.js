import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
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
                onClick={e => createTehPin(e, tehpins, setTehPins)}
            >
                {   
                    tehpins.map(pin => {
                        return (
                            <Marker key={pin.name} 
                                    lat={pin.latitude} lng={pin.longitude} 
                                    pin={pin} tehpins={tehpins} setTehPins={setTehPins}/>
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    )
}

const createTehPin = (e, tehpins, setTehPins) => {
    axios
    .post(`/api/shops/`, {
        "name": "New Teh Pin",
        "latitude": e.lat,
        "longitude": e.lng,
        "zipcode": null,
        "description": "",
        "price": null
    })
    .then(res => res.data)
    .then(newPin => setTehPins(tehpins => [...tehpins, newPin]))
    .then(console.log(tehpins))
    .catch(err => console.log(err))
}

const Marker = props => {
    const [pinName, setName] = useState(props.pin.name)
    const [zipcode, setZipcode] = useState(props.pin.zipcode)
    const [address, setAddress] = useState(props.pin.address)
    const [description, setDescription] = useState(props.pin.description)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true)
        e.stopPropagation()
    };

    const updatePinAndHandleClose = () => {
        axios
        .patch(`/api/shops/${props.pin.id}/`,{
            zipcode: zipcode,
            address: address,
            description: description
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        handleClose()
    }

    const deletePinAndHandleClose = (tehpins, setTehPins) => {
        axios
            .delete(`/api/shops/${props.pin.id}/`)
            .then(setTehPins(tehpins.filter(pin => pin.id !== props.pin.id)))
            .catch(err => console.log(err))
        handleClose()
    }

    return (
        <>
            <img style={{ width: 50, height: 50, cursor: 'default' }} src="iced-tea.png" alt="teh-pin" onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Edit this Teh Pin!
                </Modal.Header>
                <Modal.Body>
                    <EditTehPinForm pin={props.pin} 
                                setName={setName} name={pinName}
                                setZipcode={setZipcode} zipcode={zipcode}
                                setAddress={setAddress} address={address}
                                setDescription={setDescription} description={description}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deletePinAndHandleClose(props.tehpins, props.setTehPins)}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={updatePinAndHandleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

const EditTehPinForm = props => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="edit.shopName">
                <Form.Label>Name of Teh Pin</Form.Label>
                <Form.Control
                    type="text"
                    value={props.name}
                    onChange={(e => props.setName(e.target.value))}
                    autoFocus
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopZipcode"
            >
                <Form.Label>Zipcode</Form.Label>
                <Form.Control 
                    type="text" 
                    value={props.zipcode}
                    onChange={e => props.setZipcode(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopAddress"
            >
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    value={props.address}
                    onChange={e => props.setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="edit.shopDescription"
            >
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={props.description}
                    onChange={e => props.setDescription(e.target.value)}
                />
            </Form.Group>
        </Form>
    )

}

export default Map;

