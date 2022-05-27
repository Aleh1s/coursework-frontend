import React, {useState} from 'react';
import {Accordion, Button, Col, Figure, Image, Row} from "react-bootstrap";
import {API_URL} from "../../http";
import {useDispatch} from "react-redux";
import AcceptEventModal from "../modals/AcceptEventModal";
import ModalOrders from "../modals/ModalOrders";
import AdvertisementService from "../../service/AdvertisementService";
import OrdersService from "../../service/OrdersService";

const MyAdvertisement = ({advertisement, fetchAdvertisements, setError}) => {

    const id = advertisement.uniqueId
    const dispatch = useDispatch()

    const [showOrders, setShowOrders] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [myOrders, setMyOrders] = useState([])

    const fetchOrders = () => {
        OrdersService.getAllByAdvertisementId(id)
            .then(response => {
                setMyOrders(response.data)
            })
            .catch(err => console.log(err))
    }

    const removeAdvertisement = () => {
        AdvertisementService.removeAdvertisementById(id)
            .then(() => {
                setShowRemove(false)
                fetchAdvertisements()
            })
            .catch(err => {
                setShowRemove(false)
                window.scrollTo(0, 0)
                setError({show: true, message: err.response.data.message})
            })
    }

    return (
        <>
            <Accordion.Item eventKey={advertisement.uniqueId}>
                <Accordion.Header>
                    <Row className={'d-flex justify-content-between align-items-center'}>
                        <Col className={'col-3'}>
                            <Image className={'img-thumbnail'}
                                   src={`${API_URL}/v1/images/advertisements?_id=${advertisement.uniqueId}`}/>
                        </Col>
                        <Col className={'col-9'}>
                            {advertisement.category} - {advertisement.title}
                        </Col>
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <Row className={'d-flex justify-content-start align-items-start'}>
                        <Row>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>
                                        Unique number: {advertisement.uniqueId}, created
                                        at: {advertisement.createdAt.substring(0, 10)}
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <Figure>
                                    <Figure.Caption>
                                        Creator info
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{advertisement.userResponse.email}</p>
                            </Col>
                            <Col className={'col-12'}>
                                <p style={{fontSize: '14px'}}>{advertisement.userResponse.firstName} {advertisement.userResponse.lastName}</p>
                            </Col>
                        </Row>
                        <Row className={'d-flex justify-content-center align-items-center'}>
                            <Col className={'d-flex justify-content-between align-items-center'}>
                                {
                                    advertisement.category === 'ITEM' ?
                                        <a className={'link-info'} onClick={() => {
                                            fetchOrders()
                                            setShowOrders(true)
                                        }
                                        }>Show orders</a>
                                        :
                                        <></>
                                }
                                <Button variant={'danger'} onClick={() => {
                                    setShowRemove(true)
                                    dispatch({type: 'SET_ADVERTISEMENT_ID', payload: id})
                                }}>Remove</Button>
                            </Col>
                        </Row>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>

            <ModalOrders myOrders={myOrders} fetchOrders={fetchOrders} show={showOrders} setShow={setShowOrders}/>

            <AcceptEventModal title={'Remove advertisement ?'} body={'Do you want to remove advertisement ?'}
                              action={removeAdvertisement}
                              show={showRemove}
                              setShow={setShowRemove}/>
        </>
    );
};

export default MyAdvertisement;