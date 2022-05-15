import React from 'react';
import {Modal} from "react-bootstrap";

const ModalOrders = ({show, setShow, orders}) => {

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
            // todo: orders
        </Modal.Body>
    </Modal>
)
    ;
};

export default ModalOrders;