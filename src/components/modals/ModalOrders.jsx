import React from 'react';
import {Accordion, Modal} from "react-bootstrap";
import AdvertisementOrderItem from "../order/AdvertisementOrderItem";

const ModalOrders = ({show, setShow, orders, setShowConfirmModal, setShowDeclineOrder, setShowSentOrder}) => {

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
                        orders ? orders.map(order => <AdvertisementOrderItem setShowOrders={setShow} setShowConfirmModal={setShowConfirmModal}
                                                                             setShowDeclineOrder={setShowDeclineOrder}
                                                                             setShowSentOrder={setShowSentOrder}
                                                                             order={order}/>) : <h1>No orders</h1>
                    }
                </Accordion>
            </Modal.Body>
        </Modal>
    )
        ;
};

export default ModalOrders;