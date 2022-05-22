import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import UserService from "../../service/UserService";

const AddProfileImageModal = ({show, setShow}) => {

    const [image, setImage] = useState({})

    const handleAddImage = () => {
        const data = new FormData()
        data.append('_image', image)
        UserService.addImage(data)
            .then(() => setShow(false))
            .catch(err => console.log(err))
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
                            <Form.Control type="file" multiple onChange={event => setImage(event.target.files[0])}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAddImage()}>
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