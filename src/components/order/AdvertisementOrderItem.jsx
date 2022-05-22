import React from 'react';
import {Accordion, Badge, Button, Col, Figure, Image, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {API_URL} from "../../http";

const AdvertisementOrderItem = ({setShowOrders, order, setShowConfirmModal, setShowDeclineModal, setShowSentModal}) => {

    const dispatch = useDispatch()

    const checkOrderStatus = () => {
        switch (order.orderStatus) {
            case 'UNCONFIRMED':
                return <Badge bg={'secondary'}>UNCONFIRMED</Badge>
            case 'DECLINED':
                return <Badge bg={'danger'}>DECLINED</Badge>
            case 'CANCELED':
                return <Badge bg={'warning'}>CANCELED</Badge>
            case 'CONFIRMED':
                if (order.deliveryEntity.deliveryStatus === 'DELIVERED') {
                    return;
                } else {
                    return <Badge bg={'success'}>CONFIRMED</Badge>
                }
            default:
                throw new Error('Unknown status')
        }
    }

    const getButtonsByOrderStatus = () => {
        switch (order.orderStatus) {
            case 'UNCONFIRMED':
                return (
                    <Row className={'mx-auto my-auto'}>
                        <Col className={'col-6 d-flex justify-content-center'}>
                            <Button onClick={() => handleConfirm()} variant={'success'}>Confirm</Button>
                        </Col>

                        <Col className={'col-6 d-flex justify-content-center'}>
                            <Button onClick={() => handleDecline()} variant={'danger'}>Decline</Button>
                        </Col>
                    </Row>
                )
            case 'DECLINED':
                return;
            case 'CANCELED':
                return;
            case 'CONFIRMED':
                if (order.deliveryEntity.deliveryStatus === 'IN_PROCESS') {
                    return (
                        <Row className={'mx-auto my-auto'}>
                            <Col className={'d-flex col-6 justify-content-center'}>
                                <Button onClick={() => handleDecline()} variant={'danger'}>Decline</Button>
                            </Col>

                            <Col className={'d-flex col-6 justify-content-center'}>
                                <Button onClick={() => handleSent()} variant={'primary'}>The parcel has been sent</Button>
                            </Col>
                        </Row>
                    )
                } else {
                    return;
                }
            default:
                throw new Error('Unknown status')
        }
    }

    const handleConfirm = () => {
        setShowOrders(false)
        dispatch({type: 'MY_ADVERTISEMENT_ORDER_ID', payload: order.uniqueId})
        setShowConfirmModal(true)
    }

    const handleDecline = () => {
        setShowOrders(false)
        dispatch({type: 'MY_ADVERTISEMENT_ORDER_ID', payload: order.uniqueId})
        setShowDeclineModal(true)
    }

    const handleSent = () => {
        setShowOrders(false)
        dispatch({type: 'MY_ADVERTISEMENT_ORDER_ID', payload: order.uniqueId})
        setShowSentModal(true)
    }

    const onCompleted = () => {
        if (order.orderStatus === 'CONFIRMED' && order.deliveryEntity.deliveryStatus === 'DELIVERED') {
            return (
                <Badge pill bg={"success"}>Completed</Badge>
            )
        }
    }

    return (
        <Accordion.Item eventKey={order.uniqueId}>
            <Accordion.Header>
                <Row className={'d-flex justify-content-between align-items-center'}>
                    <Col className={'d-flex justify-content-start align-items-start col-12'}>
                        <p className={'mx-auto my-auto'}>{onCompleted()} {order.receiver.firstName} {order.receiver.lastName} {checkOrderStatus()}
                        </p>
                    </Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body>
                <Row className={'d-flex'}>
                    <Col className={'col-12'}>
                        <Figure.Caption>Unique id: {order.uniqueId} created
                            at {order.createdAt.substring(0, 10)}</Figure.Caption>
                    </Col>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure.Caption>Receiver</Figure.Caption>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.receiver.firstName} {order.receiver.lastName}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.receiver.email}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.receiver.phoneNumber}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure.Caption>Delivery</Figure.Caption>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.deliveryEntity.city}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.deliveryEntity.address}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{order.deliveryEntity.postOffice}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}><strong>{order.deliveryEntity.deliveryStatus}</strong></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure.Caption>Order</Figure.Caption>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}><strong>{order.orderStatus}</strong></p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '15px'}}>Extra wishes:</p>
                        </Col>
                        <Col>
                            <p style={{fontSize: '14px'}}>{order.wishes}</p>
                        </Col>
                    </Row>
                    {getButtonsByOrderStatus()}

                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default AdvertisementOrderItem;