import React from 'react';
import {Accordion, Col, Image, Modal, Row} from "react-bootstrap";
import AdvertisementOrderItem from "../order/AdvertisementOrderItem";

const ModalOrders = ({show, setShow, orders, setShowConfirmModal, setShowDeclineModal, setShowSentModal}) => {

    const noResultImage = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Orders
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {
                        orders.length !== 0 ? orders.map(order => <AdvertisementOrderItem setShowOrders={setShow}
                                                                                          setShowConfirmModal={setShowConfirmModal}
                                                                                          setShowDeclineModal={setShowDeclineModal}
                                                                                          setShowSentModal={setShowSentModal}
                                                                                          order={order}/>) :
                            <Row className={'d-flex justify-content-center'}>
                                <Col className={'cow-12 d-flex justify-content-center'}>
                                    <Image src={noResultImage} className={'img-fluid'}/>
                                </Col>
                            </Row>
                    }
                </Accordion>
            </Modal.Body>
        </Modal>
    )
        ;
};

export default ModalOrders;