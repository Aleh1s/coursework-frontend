import React from 'react';
import {Card, Col} from "react-bootstrap";

const Sale = ({sale}) => {
    return (
        <Col className={'col-lg-4 col-12 mx-auto my-auto'}>
            <Card
                bg={'dark'}
                key={'dark'}
                text={'white'}
                style={{width: '14rem'}}
                className="mb-2"
            >
                <Card.Header>{sale.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{sale.name}</Card.Title>
                    <Card.Text>
                        <hr/>
                        <p>Unique key: {sale.id}</p>
                        <p>Receiver: {sale.receiver ? sale.receiver : 'none'}</p>
                        <p>City: {sale.city}</p>
                        <p>Status: {sale.status}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Sale;