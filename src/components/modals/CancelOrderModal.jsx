import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";

const CancelOrderModal = ({show, setShow, handleCancelOrder}) => {


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
                        Cancel ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to cancel ?</Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'} onClick={() => handleCancelOrder()}>Yes</Button>
                    <Button variant={'success'} onClick={() => setShow(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CancelOrderModal;