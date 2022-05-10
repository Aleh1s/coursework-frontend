import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

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
                            <Row className={'d-flex'}>
                                <Col>
                                    <a className={'link-info'}>Details</a>
                                </Col>
                                <Col className={'d-flex flex-column-reverse reverse'}>
                                    <a className={'link-danger'}>Delete</a>
                                </Col>
                            </Row>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Sale;