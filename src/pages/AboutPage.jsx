import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import FeedbackForm from "../components/FeedbackForm";

const AboutPage = () => {
    return (
        <Container>
            <Row>
                <Col className={'mx-auto my-3'}>
                    <p className={'h1'} align={'center'}>About us</p>
                    <hr/>
                    <p>This website was created by Oleksandr Palamarchuk with purpose to help refugees from different country.
                    In this site you can post some things like: items, houses or services which you can give to people who needs.</p>
                    <hr/>
                </Col>
                <FeedbackForm/>
            </Row>
        </Container>
    );
};

export default AboutPage;