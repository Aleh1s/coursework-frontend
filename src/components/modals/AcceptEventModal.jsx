import React from 'react';
import {Button, Modal} from "react-bootstrap";

const AcceptEventModal = ({show, setShow, action, title, body}) => {
    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant={'success'} onClick={() => action()}>Yes</Button>
                <Button variant={'danger'} onClick={() => setShow(false)}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AcceptEventModal;