import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Item from "./Item";

const Items = ({items}) => {
    return (
        <Container>
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