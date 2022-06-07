import React, {useState} from 'react';
import {Accordion, Badge, Button, Col, Figure, Image, Row} from "react-bootstrap";
import {API_URL} from "../../http";
import OrdersService from "../../service/OrdersService";
import AcceptEventModal from "../modals/AcceptEventModal";

const MyPurchase = ({purchase, fetchPurchases}) => {

    const [showCancelPurchase, setShowCancelPurchase] = useState(false)
    const [showMarkAsDelivered, setShowMarkAsDelivered] = useState(false)

    const checkOrderStatus = () => {
        switch (purchase.orderStatus) {
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
                if (purchase.delivery.deliveryStatus === 'DELIVERED') {
                    return;
                } else if (purchase.delivery.deliveryStatus === 'IN_PROCESS') {
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
                } else {
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
                console.log('Unknown status')
                break
        }
    }

    const handleCancelPurchase = () => {
        OrdersService.cancelOrder(purchase.uniqueId)
            .then(() => {
                setShowCancelPurchase(false)
                fetchPurchases()
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => {
        setShowCancelPurchase(true)
    }

    const changeDeliveryStatusOfPurchase = () => {
        OrdersService.changeDeliveryStatus(purchase.uniqueId, 'DELIVERED')
            .then(() => {
                setShowMarkAsDelivered(false)
                fetchPurchases()
            })
            .catch(err => console.log(err))
    }

    const handleMarkAsDelivered = () => {
        setShowMarkAsDelivered(true)
    }

    const getButtonsByOrderStatus = () => {
        switch (purchase.orderStatus) {
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
                if (purchase.delivery.deliveryStatus === 'IN_PROCESS') {
                    return (
                        <Row className={'mx-auto my-auto'}>
                            <Col className={'d-flex col-12 justify-content-center'}>
                                <Button onClick={() => handleCancel()} variant={'warning'}>Cancel</Button>
                            </Col>
                        </Row>
                    )
                } else if (purchase.delivery.deliveryStatus === 'IN_ROAD') {
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
                console.log('Unknown status')
        }
    }

    const onCompleted = () => {
        if (purchase.orderStatus === 'CONFIRMED' && purchase.delivery.deliveryStatus === 'DELIVERED') {
            return (
                <Badge pill bg={'success'}>Completed</Badge>
            )
        }
    }

    return (
        <>
            <Accordion.Item eventKey={purchase.uniqueId}>
                <Accordion.Header>
                    <Row className={'d-flex justify-content-start align-items-center'}>
                        <Col className={'col-3'}>
                            <Image src={`${API_URL}/v1/images/advertisements?_id=${purchase.product.id}`}
                                   className={'img-thumbnail'}/>
                        </Col>
                        <Col className={'d-flex justify-content-start align-items-center col-9 mx-auto my-auto'}>
                            <p className={'mx-auto my-auto'}>{onCompleted()} {purchase.product.category} - {purchase.product.title} {checkOrderStatus()}</p>
                        </Col>
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <Row className={'d-flex justify-content-start align-items-start'}>
                        <Row>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>Unique number: {purchase.uniqueId} created
                                        at: {purchase.createdAt.substring(0, 10)}</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '13px'}}><strong>{purchase.orderStatus}</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>Delivery info</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.delivery.city}, {purchase.delivery.address}, {purchase.delivery.postOffice}.
                                </p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '13px'}}><strong>{purchase.delivery.deliveryStatus}</strong></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>Sender</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.sender.firstName} {purchase.sender.lastName}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.sender.email}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.sender.phoneNumber}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>Product</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.product.title} ({purchase.product.id})</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{purchase.product.category}</p>
                            </Col>
                        </Row>
                        {getButtonsByOrderStatus()}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <AcceptEventModal title={'Cancel order ?'} body={'Do you want to cancel order ?'}
                              action={handleCancelPurchase}
                              show={showCancelPurchase}
                              setShow={setShowCancelPurchase}/>
            <AcceptEventModal title={'Mark as delivered?'} body={'Do you want to mark as delivered?'}
                              action={changeDeliveryStatusOfPurchase}
                              setShow={setShowMarkAsDelivered}
                              show={showMarkAsDelivered}/>
        </>
    );
};

export default MyPurchase;