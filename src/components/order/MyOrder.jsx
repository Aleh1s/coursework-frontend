import React, {useState} from 'react';
import {Accordion, Badge, Button, Col, Figure, Row} from "react-bootstrap";
import AcceptEventModal from "../modals/AcceptEventModal";
import OrdersService from "../../service/OrdersService";

const MyOrder = ({order, setShowOrders, fetchOrders}) => {

    const [showChangeStatus, setShowChangeStatus] = useState(false)
    const [showDecline, setShowDecline] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const checkOrderStatus = () => {
        switch (order.orderStatus) {
            case 'UNCONFIRMED':
                return <Badge bg={'secondary'}>UNCONFIRMED</Badge>
            case 'DECLINED':
                return <Badge bg={'danger'}>DECLINED</Badge>
            case 'CANCELED':
                return <Badge bg={'warning'}>CANCELED</Badge>
            case 'CONFIRMED':
                if (order.delivery.deliveryStatus === 'DELIVERED') {
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
                if (order.delivery.deliveryStatus === 'IN_PROCESS') {
                    return (
                        <Row className={'mx-auto my-auto'}>
                            <Col className={'d-flex col-6 justify-content-center'}>
                                <Button onClick={() => handleDecline()} variant={'danger'}>Decline</Button>
                            </Col>

                            <Col className={'d-flex col-6 justify-content-center'}>
                                <Button onClick={() => handleSent()} variant={'primary'}>The parcel has been
                                    sent</Button>
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
        setShowConfirm(true)
    }

    const handleDecline = () => {
        setShowDecline(true)
    }

    const handleSent = () => {
        setShowChangeStatus(true)
    }

    const handleSentOrder = () => {
        OrdersService.changeDeliveryStatus(order.uniqueId, 'IN_ROAD')
            .then(() => {
                setShowChangeStatus(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleConfirmOrder = () => {
        OrdersService.confirmOrder(order.uniqueId)
            .then(() => {
                setShowConfirm(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleDeclineOrder = () => {
        OrdersService.declineOrder(order.uniqueId)
            .then(() => {
                setShowDecline(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const onCompleted = () => {
        if (order.orderStatus === 'CONFIRMED' && order.delivery.deliveryStatus === 'DELIVERED') {
            return (
                <Badge pill bg={"success"}>Completed</Badge>
            )
        }
    }

    return (
        <>
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
                                <p style={{fontSize: '14px'}}>{order.delivery.city}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{order.delivery.address}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{order.delivery.postOffice}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}><strong>{order.delivery.deliveryStatus}</strong></p>
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
            <AcceptEventModal title={'Was parcel sent ?'} body={'Have you sent parcel ?'}
                              action={handleSentOrder}
                              setShow={setShowChangeStatus} show={showChangeStatus}/>

            <AcceptEventModal title={'Decline order ?'} body={'Do you want to decline order ?'}
                              action={handleDeclineOrder}
                              setShow={setShowDecline} show={showDecline}/>

            <AcceptEventModal title={'Confirm order ?'} body={'Do you want to confirm order ?'}
                              action={handleConfirmOrder}
                              setShow={setShowConfirm} show={showConfirm}/>
        </>
    );
};

export default MyOrder;