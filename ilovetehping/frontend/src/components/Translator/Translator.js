import { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Alert } from 'react-bootstrap';

import '../../global.css'

function Translator() {
    const [drinkResult, setDrinkResult] = useState('');
    const [baseValue, setBaseValue] = useState('1');
    const [milkValue, setMilkValue] = useState('1');
    const [sugarValue, setSugarValue] = useState('1');
    const [tempValue, setTempValue] = useState('1');
    const [more, setMore] = useState(false);
    
    const baseRadios = [
        { name: 'Tea', value: '1' },
        { name: 'Coffee', value: '2' }
    ];
    const milkRadios = [
        { name: 'Condensed Milk', value: '1' },
        { name: 'Evaporated Milk', value: '2' },
        { name: 'No Milk', value: '3' }
    ];
    const sugarRadios = [
        { name: '100%', value: '1' },
        { name: '50%', value: '2' },
        { name: '25%', value: '3' },
        { name: '0%', value: '4' }
    ];
    const tempRadios = [
        { name: 'Hot', value: '1' },
        { name: 'Iced', value: '2' }
    ];

    useEffect(() => {
        let base = '';
        let milk = '';
        let sugar = '';
        let temp = '';
        let moreRes = '';
        switch (baseValue) {
            case '1':
                base = 'Teh';
                break;
            case '2':
                base = 'Kopi';
                break;
        }
        switch (milkValue) {
            case '1':
                milk = ''
                break
            case '2':
                milk = ' C'
                break
            case '3':
                milk = ' O'
                break
        }
        switch (sugarValue) {
            case '1':
                sugar = ''
                break
            case '2':
                sugar = ' Siew Dai'
                break
            case '3': 
                sugar = ' Siew Siew Dai'
                break
            case '4':
                sugar = ' Kosong'
                break
        }
        switch (tempValue) {
            case '1':
                temp = ''
                break
            case '2':
                temp = ' Ping'
                break
        }
        switch (more) {
            case true:
                moreRes = ' Gao'
                break
            case false:
                moreRes = ''
                break
        }
        setDrinkResult(`${base}${milk}${temp}${moreRes}${sugar}`)
    }, [baseValue, milkValue, sugarValue, tempValue, more])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Form >
                <Row >
                    <h1 className='my-4'>Teh Ping Translator</h1>
                </Row>
                <Row >
                    <Form.Group className='mb-4'>
                        <Form.Label>
                            <h3>Base Drink</h3>
                        </Form.Label>
                        <br />
                        <div className='translator-column' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <ButtonGroup >
                                {baseRadios.map((radio, idx) => (
                                    <ToggleButton
                                        style={{ width: '8em', maxWidth:'8em' }}
                                        key={idx}
                                        id={`base-${idx}`}
                                        type="radio"
                                        variant={'outline-dark'}
                                        name="base"
                                        value={radio.value}
                                        checked={baseValue === radio.value}
                                        onChange={(e) => setBaseValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                            <ToggleButton
                                style={{ width: '4em', maxWidth:'8em'}}
                                id="toggle-check"
                                type="checkbox"
                                variant="outline-dark"
                                checked={more}
                                value="1"
                                onChange={(e) => setMore(e.currentTarget.checked)}
                            >
                                More
                            </ToggleButton>
                        </div>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className='mb-4'>
                        <Form.Label>
                            <h3>
                                Type of Milk
                            </h3>
                        </Form.Label>
                        <br />
                        <ButtonGroup className='translator-column'>
                            {milkRadios.map((radio, idx) => (
                                <ToggleButton
                                    style={{ width: '10em' }}
                                    key={idx}
                                    id={`milk-${idx}`}
                                    type="radio"
                                    variant={'outline-dark'}
                                    name="milk"
                                    value={radio.value}
                                    checked={milkValue === radio.value}
                                    onChange={(e) => setMilkValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className='mb-4'>
                        <Form.Label>
                            <h3>
                                Sugar Level
                            </h3>
                        </Form.Label>
                        <br />
                        <ButtonGroup className='translator-column'>
                            {sugarRadios.map((radio, idx) => (
                                <ToggleButton
                                    style={{ width: '6em' }}
                                    key={idx}
                                    id={`sugar-${idx}`}
                                    type="radio"
                                    variant={'outline-dark'}
                                    name="sugar"
                                    value={radio.value}
                                    checked={sugarValue === radio.value}
                                    onChange={(e) => setSugarValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className='mb-4'>
                        <Form.Label>
                            <h3>
                                Temperature
                            </h3>
                        </Form.Label>
                        <br />
                        <ButtonGroup>
                            {tempRadios.map((radio, idx) => (
                                <ToggleButton
                                    style={{ width: '6em' }}
                                    key={idx}
                                    id={`temp-${idx}`}
                                    type="radio"
                                    variant={'outline-dark'}
                                    name="temp"
                                    value={radio.value}
                                    checked={tempValue === radio.value}
                                    onChange={(e) => setTempValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Alert variant='warning' className='translator-alert' >
                        Your drink is: <strong>{drinkResult}!</strong>
                    </Alert>
                </Row>

            </Form>
        </div>



    );
}

export default Translator;