import React from 'react';
import {Container, Row} from "react-bootstrap";
import Item from "./Item";
import Service from "./Service";

const Services = ({services}) => {
    return (
        <Container>
            <Row>
                {
                    services ? services.map(
                        (service, index) =>
                            <Service key={index} service={service} />
                    ) : <p>No items</p>
                }
            </Row>
        </Container>
    );
};

export default Services;