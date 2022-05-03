import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Tab from "../components/Tab";

const HomePage = () => {

    const [items, setItems] = useState([
        {
            title: 'Rover',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Rover',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Rover',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Rover',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Rover',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }
    ])

    const [services, setServices] = useState([
        {
            title: 'Haircut',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Haircut',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Haircut',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Haircut',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }, {
            title: 'Haircut',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
        }
    ])

    return (
        <Container>
            <Row>
                <Col className={'col-12 mx-auto my-4'}>
                    <Tab items={items} services={services}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;