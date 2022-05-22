import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import AdvertisementService from "../../service/AdvertisementService";

const ModalCreateAdvertisement = ({show, handleClose, category, onCreate}) => {

    const [creationData, setCreationData] = useState({
        image: null,
        title: '',
        description: '',
        city: '',
        category,
    })

    const handleSubmit = () => {
        const data = new FormData()
        data.append("_image", creationData.image)
        data.append("_title", creationData.title)
        data.append("_description", creationData.description)
        data.append("_city", creationData.city)
        data.append("_category", creationData.category)
        AdvertisementService.createAdvertisement(data)
            .then(() => {
                handleClose()
                onCreate()
            })
            .catch(err => {
                console.log(err)
                handleClose()
            })
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
                            <Form.Control type="file" multiple onChange={event => setCreationData({
                                ...creationData,
                                image: event.target.files[0]})}/>
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

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                autoFocus
                                onChange={event => setCreationData({...creationData, city: event.target.value})}
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