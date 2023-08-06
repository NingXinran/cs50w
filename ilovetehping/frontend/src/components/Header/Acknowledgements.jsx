import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'

const Acknowledgements = (props) => {
    return (
        <Offcanvas 
            show={props.showAck} 
            onHide={() => props.setShowAck(false)}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <h3>Acknowledgements</h3>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <span>
                    Thanks to the following for their help with this ilovetehping project.
                    <br/><hr/>
                    <strong>CS50w</strong> - Course lectures, assignments, and grading
                    <br/><br/>
                    <strong>Assets</strong> - Beniamino nobile for the beautiful google map style; 
                    Freepik flaticon and FontAwesomeIcons for the icons
                    <br/><br/>
                    <strong>Friends and family</strong> - Support and encouragement
                    <br/><br/>
                    <strong>Finally, good teh ping</strong> - For inspiring this project!
                </span>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Acknowledgements