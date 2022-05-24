import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";

const NotFound = () => {
    const notFoundImage = 'https://i.stack.imgur.com/6M513.png'

    return (
        <Container>
            <Row className={'d-flex justify-content-center align-items-center'}>
                <Image as={Col} src={notFoundImage}/>
            </Row>
        </Container>
    );
};

export default NotFound;