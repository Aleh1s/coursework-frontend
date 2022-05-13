import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";

const MarkAsDeliveredModal = ({show, setShow, handleMarkAsDelivered}) => {
    return (
        <Container>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Mark as delivered?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Did you get order?</Modal.Body>
                <Modal.Footer>
                    <Button variant={'success'} onClick={() => handleMarkAsDelivered()}>Yes</Button>
                    <Button variant={'danger'} onClick={() => setShow(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MarkAsDeliveredModal;