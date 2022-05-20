import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Pagination, Row} from "react-bootstrap";
import TabHome from "../components/UI/TabHome";
import {Context} from "../index";

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