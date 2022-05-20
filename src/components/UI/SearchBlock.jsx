import React from 'react';
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

const SearchBlock = ({placeHolderText, handleShowCreateModal, handleSearch, setQuery}) => {
    return (
        <Row>
            <Col className={'mx-auto my-2'}>
                <InputGroup className="mb-3 mx-auto my-3">
                    <FormControl
                        placeholder={placeHolderText}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={event => setQuery(event.target.value)}
                    />
                    <Button variant="outline-primary" id="button-addon2" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button variant="primary" id="button-addon2" onClick={handleShowCreateModal}>
                        Create
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default SearchBlock;