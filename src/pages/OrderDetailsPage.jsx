import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import OrdersService from "../service/OrdersService";
import {Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import CancelOrderModal from "../components/modals/CancelOrderModal";
import MarkAsDeliveredModal from "../components/modals/MarkAsDeliveredModal";

const OrderDetailsPage = () => {

    const orderId = useSelector(state => state.orderId)
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false)
    const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)
    const [details, setDetails] = useState({
        advertisementTitle: '',
        advertisementCategory: '',
        advertisementCreatorEmail: '',
        advertisementDescription: '',
        orderStatus: '',
        createdAt: '',
        deliveryCity: '',
        deliveryAddress: '',
        deliveryPostAddress: '',
        deliveryStatus: ''
    })

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = () => {
        OrdersService.getOrderDetailsModel(orderId)
            .then(response => setDetails(response.data))
            .catch(err => console.log(err))
    }

    const handleCancelOrder = () => {
        OrdersService.cancelOrder(orderId)
            .then(response => {
                setShowCancelOrderModal(false)
                fetchOrderDetails()
            })
            .catch(err => console.log(err))
    }

    const handleMarkAsDelivered = () => {
        OrdersService.changeDeliveryStatus(orderId, 'DELIVERED')
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row className={'shadow-lg mx-auto my-3'}>
                <Col className={'d-flex col-8 mx-auto my-5 justify-content-center align-items-center'}>
                    <Row>
                        <Col className={'col-12'}>
                            <Row>
                                <Col className={'d-flex mx-auto justify-content-center align-items-center'}>
                                    <p className={'h5'}>Advertisement</p>
                                </Col>
                            </Row>
                            <p>Title: {details.advertisementTitle}</p>
                            <p>Category: {details.advertisementCategory}</p>
                            <p>Creator email: {details.advertisementCreatorEmail}</p>
                            <p>Description: {details.advertisementDescription}</p>
                        </Col>
                        <hr/>
                        <Col className={'col-12'}>
                            <Row>
                                <Col className={'d-flex mx-auto justify-content-center align-items-center'}>
                                    <p className={'h5'}>Order info</p>
                                </Col>
                            </Row>
                            <p>Status: {details.orderStatus}</p>
                            <p>Created at: {details.createdAt}</p>
                        </Col>
                        <hr/>
                        <Col className={'col-12'}>
                            <Row>
                                <Col className={'d-flex mx-auto justify-content-center align-items-center'}>
                                    <p className={'h5'}>Delivery info</p>
                                </Col>
                            </Row>
                            <p>City: {details.deliveryCity}</p>
                            <p>Address: {details.deliveryAddress}</p>
                            <p>Post office: {details.deliveryPostAddress}</p>
                            <p>Status: {details.deliveryStatus}</p>
                        </Col>
                        <Row className={'d-flex justify-content-between align-items-center'}>
                            <Col className={'col-6 mx-auto my-3 d-flex justify-content-center'}>
                                {
                                    details.deliveryStatus === 'IN_PROCESS'
                                    && (
                                        details.orderStatus === 'UNCONFIRMED'
                                        || details.orderStatus === 'CONFIRMED'
                                    )
                                        ? <Button variant={"danger"}
                                                  onClick={() => setShowCancelOrderModal(true)}>Cancel</Button>
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
                                    details.deliveryStatus === 'IN_ROAD' && details.orderStatus === 'CONFIRMED'
                                        ? <Button variant={"success"}
                                                  onClick={() => setShowMarkAsDeliveredModal(true)}>Mark as
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
                </Col>
            </Row>
            <CancelOrderModal handleCancelOrder={handleCancelOrder} show={showCancelOrderModal}
                              setShow={setShowCancelOrderModal}/>
            <MarkAsDeliveredModal handleMarkAsDelivered={handleMarkAsDelivered} setShow={setShowMarkAsDeliveredModal}
                                  show={showMarkAsDeliveredModal}/>
        </Container>
    );
};

export default OrderDetailsPage;