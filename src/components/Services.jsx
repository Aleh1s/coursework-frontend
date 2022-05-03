import React from 'react';
import {Container, Row} from "react-bootstrap";
import Item from "./Item";
import Service from "./Service";
import SearchBlock from "./SearchBlock";

const Services = ({services}) => {
    return (
        <Container>
            <SearchBlock placeHolderText={'Search service'} textForButton={'Search'}/>
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