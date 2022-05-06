import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Pagination, Row} from "react-bootstrap";
import TabHome from "../components/UI/TabHome";
import {Context} from "../index";

const HomePage = () => {

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

    // const {user} = useContext(Context)

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Col className={'col-12 mx-auto my-4'}>
                    <TabHome services={services}/>
                </Col>
            </Row>
            {/*<Button onClick={() => console.log(user.getUser())}>test</Button>*/}
        </Container>
    );
};

export default HomePage;