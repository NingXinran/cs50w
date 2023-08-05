import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FloatingLabel from "react-bootstrap/FloatingLabel"

// props: setFilterText, setFilterDropdown

const Filter = (props) => {

    return (
        <Form className="ml-4">
            <Row>
                <Col style={{ maxWidth: '15em' }} className="px-0">
                    <Form.Control
                        placeholder="Type to Search"
                        value={props.searchFilter}
                        style={{
                            borderBottomLeftRadius: '30px', borderTopLeftRadius: '30px',
                            borderBottomRightRadius: '0px', borderTopRightRadius: '0px'
                        }}
                        onChange={e => {
                            props.handleSearch(e.target.value)
                        }}
                    />
                </Col>
                <Col style={{ maxWidth: '10em' }} className="px-0">
                    <Form.Select
                        style={{
                            borderBottomRightRadius: '30px', borderTopRightRadius: '30px',
                            borderBottomLeftRadius: '0px', borderTopLeftRadius: '0px'
                        }}
                        onChange={e => {
                            props.handleSort(e.target.value)
                        }}
                    >
                        <option>Sort by</option>
                        <option value={'name'}>Name (A-Z)</option>
                        <option value={'rating'}>Top Rated</option>
                        <option value={'timestamp'}>Latest</option>

                    </Form.Select>
                </Col>
            </Row>
        </Form>
    )
}

export default Filter