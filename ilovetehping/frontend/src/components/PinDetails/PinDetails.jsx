import React from "react";

const PinDetails = (props) => {
    const tehpins = props.tehpins
    return (
        <div>
            {tehpins.map(pin => {
                return <div>{pin.name}, {pin.rating}</div>
            })}
        </div>
    )
}

export default PinDetails;