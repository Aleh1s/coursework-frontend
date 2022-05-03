import React from 'react';
import {Col, Container, Pagination, Row} from "react-bootstrap";
import Item from "./Item";
import SearchBlock from "../UI/SearchBlock";

const Items = ({items}) => {

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
            <SearchBlock placeHolderText={'Search item'} textForButton={'Search'}/>
            <Row>
                {
                    items ? items.map(
                        (item, index) =>
                            <Item key={index} item={item}/>
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

export default Items;