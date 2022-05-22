import React from 'react';
import {Accordion, Badge, Button, Col, Figure, Image, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {API_URL} from "../../http";

const MyOrder = ({order, setShowCancelOrderModal, setShowMarkAsDeliveredModal}) => {

    const dispatch = useDispatch()

    const checkOrderStatus = () => {
        switch (order.orderStatus) {
            case 'UNCONFIRMED':
                return (
                    <Row className={'d-flex justify-content-start align-items-center'}>
                        <Col className={'col-6'}>
                            <Badge bg={'secondary'}>UNCONFIRMED</Badge>
                        </Col>
                        <Col className={'col-6'}>
                            <Badge bg={'secondary'}>IN PROCESS</Badge>
                        </Col>
                    </Row>
                )
            case 'DECLINED':
                return <Badge bg={'danger'}>DECLINED</Badge>
            case 'CANCELED':
                return <Badge bg={'warning'}>CANCELED</Badge>
            case 'CONFIRMED':
                if (order.deliveryEntity.deliveryStatus === 'DELIVERED') {
                    return;
                } else if(order.deliveryEntity.deliveryStatus === 'IN_PROCESS'){
                    return (
                        <Row className={'d-flex justify-content-start align-items-center'}>
                            <Col className={'col-6'}>
                                <Badge bg={'success'}>CONFIRMED</Badge>
                            </Col>
                            <Col className={'col-6'}>
                                <Badge bg={'secondary'}>IN PROCESS</Badge>
                            </Col>
                        </Row>
                    )
                } else if(order.deliveryEntity.deliveryStatus === 'IN_ROAD') {
                    return (
                        <Row className={'d-flex justify-content-start align-items-center'}>
                            <Col className={'col-6'}>
                                <Badge bg={'success'}>CONFIRMED</Badge>
                            </Col>
                            <Col className={'col-6'}>
                                <Badge bg={'primary'}>IN ROAD</Badge>
                            </Col>
                        </Row>
                    )
                }
            default:
                throw new Error('Unknown status')
        }
    }

    const handleCancel = () => {
        dispatch({type: 'MY_ORDER_ID', payload: order.uniqueId})
        setShowCancelOrderModal(true)
    }

    const handleMarkAsDelivered = () => {
        dispatch({type: 'MY_ORDER_ID', payload: order.uniqueId})
        setShowMarkAsDeliveredModal(true)
    }

    const getButtonsByOrderStatus = () => {
        switch (order.orderStatus) {
            case 'UNCONFIRMED':
                return (
                    <Row className={'mx-auto my-auto'}>
                        <Col className={'col-12 d-flex justify-content-center'}>
                            <Button onClick={() => handleCancel()} variant={'warning'}>Cancel</Button>
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
                            <Col className={'d-flex col-12 justify-content-center'}>
                                <Button onClick={() => handleCancel()} variant={'warning'}>Cancel</Button>
                            </Col>
                        </Row>
                    )
                } else if (order.deliveryEntity.deliveryStatus === 'IN_ROAD') {
                    return (
                        <Row className={'mx-auto my-auto'}>
                            <Col className={'d-flex col-12 justify-content-center'}>
                                <Button onClick={() => handleMarkAsDelivered()} variant={'primary'}>Mark as
                                    delivered</Button>
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

    const onCompleted = () => {
        if (order.orderStatus === 'CONFIRMED' && order.deliveryEntity.deliveryStatus === 'DELIVERED') {
            return (
                <Badge pill bg={'success'}>Completed</Badge>
            )
        }
    }

    return (
        <Accordion.Item eventKey={order.uniqueId}>
            <Accordion.Header>
                <Row className={'d-flex justify-content-start align-items-center'}>
                    <Col className={'col-3'}>
                        <Image src={`${API_URL}/v1/advertisements/image?_id=${order.product.id}`} className={'img-thumbnail'}/>
                    </Col>
                    <Col className={'d-flex justify-content-start align-items-center col-9 mx-auto my-auto'}>
                        <p className={'mx-auto my-auto'}>{onCompleted()} {order.product.category} - {order.product.title} {checkOrderStatus()}</p>
                    </Col>
                </Row>
            </Accordion.Header>
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
                    {getButtonsByOrderStatus()}
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default MyOrder;