import React from 'react';
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const SearchBlock = ({placeHolderText, handleShowCreateModal, handleSearch, setQuery}) => {

    const user = useSelector(state => state.user)

    const renderButtons = () => {
        if (user.role === 'ADMIN') {
            return (
                <Button variant="outline-primary" id="button-addon2" onClick={handleSearch}>
                    Search
                </Button>
            )
        } else {
            return (
                <>
                    <Button variant="outline-primary" id="button-addon2" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button variant="primary" id="button-addon2" onClick={handleShowCreateModal}>
                        Create
                    </Button>
                </>
            )
        }
    }

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
                    {renderButtons()}
                </InputGroup>
            </Col>
        </Row>
    );
};

export default SearchBlock;