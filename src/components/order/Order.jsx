import React from 'react';
import {Accordion, Button, Col, Figure, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {useDispatch} from "react-redux";

const Order = ({order, setShowCancelOrderModal, setShowMarkAsDeliveredModal}) => {

    const dispatch = useDispatch()

    return (
        <Accordion.Item eventKey={order.uniqueId}>
            <Accordion.Header>{order.product.category} - {order.product.title}</Accordion.Header>
            <Accordion.Body>
                <Row className={'d-flex justify-content-start align-items-start'}>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>Unique number: {order.uniqueId} created
                                    at: {order.createdAt.substring(0, 10)}</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '13px'}}><strong>{order.orderStatus}</strong></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>Delivery info</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.deliveryEntity.city}, {order.deliveryEntity.address}, {order.deliveryEntity.postOffice}.
                            </p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '13px'}}><strong>{order.deliveryEntity.deliveryStatus}</strong></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>Sender</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.sender.firstName} {order.sender.lastName}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.sender.email}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.sender.phoneNumber}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>Product</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.product.title} ({order.product.id})</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.product.category}</p>
                        </Col>
                    </Row>
                    <Row className={'d-flex justify-content-between align-items-center'}>
                        <Col className={'col-6 mx-auto my-3 d-flex justify-content-center'}>
                            {
                                order.deliveryEntity.deliveryStatus === 'IN_PROCESS'
                                && (
                                    order.orderStatus === 'UNCONFIRMED'
                                    || order.orderStatus === 'CONFIRMED'
                                )
                                    ? <Button variant={"danger"}
                                              onClick={() => {
                                                  dispatch({type: 'TO_MY_ORDER', payload: order.uniqueId})
                                                  setShowCancelOrderModal(true)
                                              }}>Cancel</Button>
                                    : <OverlayTrigger
                                        key={'left'}
                                        placement={'left'}
                                        overlay={
                                            <Tooltip>
                                                Can't cancel order.
                                            </Tooltip>
                                        }
                                    >
                                        <Button variant="danger">Cancel</Button>
                                    </OverlayTrigger>
                            }
                        </Col>
                        <Col className={'col-6 mx-auto my-3 d-flex justify-content-center'}>
                            {
                                order.deliveryEntity.deliveryStatus === 'IN_ROAD' && order.orderStatus === 'CONFIRMED'
                                    ? <Button variant={"success"}
                                              onClick={() => {
                                                  dispatch({type: 'TO_MY_ORDER', payload: order.uniqueId})
                                                  setShowMarkAsDeliveredModal(true)
                                              }}>Mark as
                                        delivered</Button>
                                    : <OverlayTrigger
                                        key={'left'}
                                        placement={'left'}
                                        overlay={
                                            <Tooltip>
                                                Can't mark.
                                            </Tooltip>
                                        }
                                    >
                                        <Button variant="success">Mark as delivered</Button>
                                    </OverlayTrigger>
                            }
                        </Col>
                    </Row>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default Order;