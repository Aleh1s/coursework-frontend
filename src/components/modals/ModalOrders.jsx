import React from 'react';
import {Accordion, Col, Image, Modal, Row} from "react-bootstrap";
import MyOrder from "../order/MyOrder";

const ModalOrders = ({
                         show,
                         setShow,
                         myOrders,
                         fetchOrders
                     }) => {

    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    My orders
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Accordion>
                        {
                            myOrders.length !== 0 ? myOrders.map(order => <MyOrder order={order} setShowOrders={setShow}
                                                                                   fetchOrders={fetchOrders}/>) :
                                <Row className={'d-flex justify-content-center'}>
                                    <Col className={'cow-12 d-flex justify-content-center'}>
                                        <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                                    </Col>
                                </Row>
                        }
                    </Accordion>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ModalOrders;