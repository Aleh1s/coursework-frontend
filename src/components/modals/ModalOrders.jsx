import React from 'react';
import {Accordion, Col, Image, Modal, Pagination, Row} from "react-bootstrap";
import MyOrder from "../order/MyOrder";

const ModalOrders = ({
                         show,
                         setShow,
                         myOrders,
                         totalCount,
                         activePage,
                         setShowConfirmModal,
                         setActivePage,
                         setShowDeclineModal,
                         setShowSentModal
                     }) => {

    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalCount / 10); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>
        );
    }

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
                            myOrders.length !== 0 ? myOrders.map(order => <MyOrder setShowOrders={setShow}
                                                                                   setShowConfirmModal={setShowConfirmModal}
                                                                                   setShowDeclineModal={setShowDeclineModal}
                                                                                   setShowSentModal={setShowSentModal}
                                                                                   order={order}/>) :
                                <Row className={'d-flex justify-content-center'}>
                                    <Col className={'cow-12 d-flex justify-content-center'}>
                                        <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                                    </Col>
                                </Row>
                        }
                    </Accordion>
                    <Row className={'my-2'}>
                        <Col>
                            <Pagination className={'mx-auto'}>{numbers}</Pagination>
                        </Col>
                    </Row>
                </Row>
            </Modal.Body>
        </Modal>
    )
        ;
};

export default ModalOrders;