import React from 'react';
import {Card, Col} from "react-bootstrap";

const Order = ({order}) => {
    return (
        <Col className={'col-lg-4 col-12 mx-auto my-auto'}>
            <Card
                bg={'dark'}
                key={'dark'}
                text={'white'}
                style={{width: '14rem'}}
                className="mb-2"
            >
                <Card.Header>{order.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{order.name}</Card.Title>
                    <Card.Text>
                        <hr/>
                        <p>Unique key: {order.id}</p>
                        <p>Sender: {order.sender ? order.sender : 'none'}</p>
                        <p>City: {order.city}</p>
                        <p>Status: {order.status}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Order;