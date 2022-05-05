import React from 'react';
import {Alert, Button, CloseButton, Col, Row} from "react-bootstrap";

const ServerErrorAlert = ({show, onHide, message}) => {

    return (
        <Alert show={show} key={'danger'} variant={'danger'}>
            <Row>
                <Col className={'mx-auto my-auto'}>
                    {message}
                </Col>
                <Col className={'d-flex flex-row-reverse my-auto'}>
                    <CloseButton onClick={() => onHide()}/>
                </Col>
            </Row>
        </Alert>
    );
};

export default ServerErrorAlert;