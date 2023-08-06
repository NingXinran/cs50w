import React, { useState } from "react";
import Alert from "react-bootstrap/Alert"

const Callout = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <div className="mt-4" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Alert
                    variant={'light'}
                    style={{ width: '75%' }}
                    onClose={() => setShow(false)}
                    dismissible

                >
                    <div style={{ display: 'flex' }}>
                        <span>
                            <strong>'Teh ping'</strong> is a popular local drink in Singapore, consisting of tea, milk and sugar.
                            It can be found in almost every local coffee shop and greatly differs in how it is made.
                        </span>

                    </div>

                </Alert>
            </div>

        )
    }


}

export default Callout