import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalPhone = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Phone number
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.phoneNumber}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPhone;