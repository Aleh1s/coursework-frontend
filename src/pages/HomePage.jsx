import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TabHome from "../components/TabHome";

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
                    <TabHome items={items} services={services}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;