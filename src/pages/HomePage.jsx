import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TabHome from "../components/UI/TabHome";

const HomePage = () => {

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Col className={'col-12 mx-auto my-4'}>
                    <TabHome/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;    