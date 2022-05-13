import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Order = ({order}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Col className={'col-lg-4 col-12 mx-auto my-auto'}>
            <Card
                bg={'light'}
                key={'dark'}
                text={'dark'}
                style={{width: '16rem'}}
                className="mb-2"
            >
                <Card.Header>{order.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{order.title}</Card.Title>
                    <Card.Text>
                        <hr/>
                        <p>Unique key: {order.uniqueId}</p>
                        <p>Sender: {order.sender}</p>
                        <p>Status: {order.orderStatus}</p>
                    </Card.Text>
                    <Row className={'d-flex'}>
                        <Col>
                            <a className={'link-info'} onClick={() => {
                                dispatch({type: 'TO_ORDER', payload: order.uniqueId})
                                navigate('/order/details')
                            }}>Details</a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Order;