import React from 'react';
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

const SearchBlock = ({placeHolderText, textForButton}) => {
    return (
        <Row>
            <Col className={'mx-auto my-2'}>
                <InputGroup className="mb-3 mx-auto my-3">
                    <FormControl
                        placeholder={placeHolderText}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-primary" id="button-addon2">
                        {textForButton}
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default SearchBlock;