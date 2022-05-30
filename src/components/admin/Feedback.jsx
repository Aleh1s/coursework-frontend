import React from 'react';
import {Alert, Col, Row, Tab} from "react-bootstrap";

const Feedback = ({feedback}) => {
    return (
        <Alert variant={'dark'} className={'d-flex justify-content-start align-items-center shadow mx-auto my-3'}>
            <Row className={'d-flex justify-content-start align-items-center my-auto'}>
                <Col className={'d-flex justify-content-start align-items-start col-12'}>
                    <h6>Email: {feedback.email}</h6>
                </Col>
                <Col className={'d-flex justify-content-start align-items-start col-12'}>
                    <p>Text: {feedback.text}</p>
                </Col>
            </Row>
        </Alert>
    );
};

export default Feedback;