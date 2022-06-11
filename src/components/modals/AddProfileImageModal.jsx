import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const AddProfileImageModal = ({show, setShow, addImage}) => {

    const [image, setImage] = useState({})

    const handleAdd = () => {
        addImage(image)
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title>Change image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                onChange={event => setImage(event.target.files[0])}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAdd()}>
                        Add
                    </Button>
                    <Button variant="danger" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddProfileImageModal;