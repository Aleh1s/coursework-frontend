import React from 'react';
import {Card, Col} from "react-bootstrap";

const Sale = ({sale}) => {
    return (
        <Col className={'col-lg-4 col-12 mx-auto my-auto'}>
            <Card
                bg={'light'}
                key={'dark'}
                text={'dark'}
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
                        {sale.status === 'SOLD_OUT' ?
                            <a className={'link-info'}>Details</a>
                            :
                            <Col className={'justify-content-between'}>
                                <a className={'link-info'}>Details</a>
                                <a className={'link-danger'}>Delete</a>
                            </Col>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Sale;