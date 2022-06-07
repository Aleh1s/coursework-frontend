import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import OrdersService from "../service/OrdersService";
import {Col, Container, Row} from "react-bootstrap";

const OrderDetailsPage = () => {

    const orderId = useSelector(state => state.orderId)

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

                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default OrderDetailsPage;