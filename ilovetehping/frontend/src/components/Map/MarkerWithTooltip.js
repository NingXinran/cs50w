import { Image } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MarkerWithTooltip(props) {
    const text = props.name

    const markerTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 120, hide: 400 }}
            overlay={markerTooltip}
        >
            <Image style={{ width: 50, height: 50, cursor: 'pointer' }}
                src="iced-coffee.png" alt="teh-pin"
                onClick={props.handleShow}
            />
        </OverlayTrigger>
    );
}

export default MarkerWithTooltip;