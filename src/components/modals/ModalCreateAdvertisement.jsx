import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import AdvertisementService from "../../service/AdvertisementService";

const ModalCreateAdvertisement = ({show, handleClose, category, onCreate}) => {

    const [creationData, setCreationData] = useState({
        title: '',
        description: '',
        category,
        height: '',
        length: '',
        width: ''
    })
    
    const handleSubmit = () => {
        AdvertisementService.createAdvertisement(creationData)
            .then(() => {
                handleClose()
                onCreate()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title>Create advertisement in item category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" multiple/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                autoFocus
                                onChange={event => setCreationData({...creationData, title: event.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter height"
                                autoFocus
                                onChange={event => setCreationData({...creationData, height: event.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Length</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter length"
                                autoFocus
                                onChange={event => setCreationData({...creationData, length: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Width</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter width"
                                autoFocus
                                onChange={event => setCreationData({...creationData, width: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            placeholder="Enter description"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          onChange={event => setCreationData({
                                              ...creationData,
                                              description: event.target.value
                                          })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAdvertisement;