import React from 'react';
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Item from "./Item";
import SearchBlock from "./SearchBlock";

const Items = ({items}) => {
    return (
        <Container>
            <SearchBlock placeHolderText={'Search item'} textForButton={'Search'}/>
            <Row>
                {
                    items ? items.map(
                        (item, index) =>
                            <Item key={index} item={item} />
                    ) : <p>No items</p>
                }
            </Row>
        </Container>
    );
};

export default Items;