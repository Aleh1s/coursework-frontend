import React from 'react';
import {Col, Container, Pagination, Row} from "react-bootstrap";
import Item from "../item/Item";
import Service from "./Service";
import SearchBlock from "../UI/SearchBlock";

const Services = ({services}) => {

    let active = 1;
    let numbers = [];
    for (let number = 1; number <= 5; number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

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
            <Row>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Services;