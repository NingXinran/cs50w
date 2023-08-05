import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullFaStar } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button";
import Filter from "./Filter";

const PinDetails = (props) => {
    const tehpins = props.tehpins
    const [filteredTP, setFilteredTP] = useState(tehpins)

    const handleSearch = (searchValue) => {
        if (searchValue === null) {
            setFilteredTP(tehpins)
        }
        const newFilteredTP = tehpins.filter(pin => {
            const nameLowerCased = pin.name.toLowerCase()
            const searchLowerCased = searchValue.toLowerCase()
            return nameLowerCased.includes(searchLowerCased)
        })
        setFilteredTP(newFilteredTP)
    }

    const handleSort = (sortValue) => {
        if (sortValue === 'Sort by') {
            return
        } 

        let sortedFilteredTP = []
        if (sortValue === 'name') {
            sortedFilteredTP = [...filteredTP].sort(
                (t1, t2) => {
                    t1 = t1[sortValue].toLowerCase()
                    t2 = t2[sortValue].toLowerCase()
                    return t1 >= t2 ? 1 : -1
                }
            )
        }
        else if (sortValue === 'rating') {
            sortedFilteredTP = [...filteredTP].sort(
                (t1, t2) => {
                    return t1[sortValue] >= t2[sortValue] ? -1 : 1
                }
            )
        }
        else if (sortValue === 'timestamp') {
            sortedFilteredTP = [...filteredTP].sort(
                (t1, t2) => {
                    return t1[sortValue] >= t2[sortValue] ? -1 : 1
                }
            )
        }
        setFilteredTP(sortedFilteredTP)
    }

    return (
        <div className="m-4">
            <div className="mb-4">
                <Filter 
                    handleSearch={handleSearch}
                    handleSort={handleSort}
                />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                {filteredTP.map(pin => {
                    return (
                        <Card key={`card-${pin.id}`} style={{ width: '18em', height: '22em' }}>
                            <Card.Body>
                                <Card.Title>{pin.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {pin.address}
                                </Card.Subtitle>
                                <Card.Text>{pin.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Rating
                                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                        fullSymbol={<FontAwesomeIcon icon={fullFaStar} />}
                                        initialRating={pin.rating}
                                        readonly
                                    />
                                    <Button
                                        onClick={() => props.handleSeePin(pin.latitude, pin.longitude, 600)}
                                        size="sm"
                                        variant="outline-dark"
                                    >
                                        View
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    )
                })}
            </div>
        </div>
        
    )
}

export default PinDetails;