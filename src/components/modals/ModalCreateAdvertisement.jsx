import React, {useEffect, useState} from 'react';
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

    const [creationDataDirty, setCreationDataDirty] = useState({
        image: false,
        title: false,
        description: false,
        city: false,
    })

    const [creationDataError, setCreationDataError] = useState({
        image: 'The image must be present',
        title: 'Title shouldn\'t be empty',
        description: 'Description should be more than 40 symbols',
        city: 'City shouldn\'t be empty',
    })

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "image":
                setCreationDataDirty({...creationDataDirty, image: true})
                break
            case "title":
                setCreationDataDirty({...creationDataDirty, title: true})
                break
            case "desc":
                setCreationDataDirty({...creationDataDirty, description: true})
                break
            case "city":
                setCreationDataDirty({...creationDataDirty, city: true})
                break
        }
    }

    const dataValidator = (e) => {
        switch (e.target.name) {
            case "image":
                setCreationData({...creationData, image: e.target.files[0]})
                if (e.target.files[0].size === 0) {
                    setCreationDataError({...creationDataError, image: 'File size can not be 0'})
                } else if (!e.target.files[0]) {
                    setCreationDataError({...creationDataError, image: 'File must be present'})
                }else {
                    setCreationDataDirty({...creationDataDirty, image: false})
                    setCreationDataError({...creationDataError, image: ''})
                }
                break
            case "title":
                setCreationData({...creationData, title: e.target.value})
                if (e.target.value.length < 5 || e.target.value.length > 20) {
                    setCreationDataError({...creationDataError, title: 'Title should be more than 5 and less than 20 symbols'})
                } else {
                    setCreationDataDirty({...creationDataDirty, title: false})
                    setCreationDataError({...creationDataError, title: ''})
                }
                break
            case "desc":
                setCreationData({...creationData, description: e.target.value})
                if (e.target.value.length < 40 || e.target.value.length > 2048) {
                    setCreationDataError({
                        ...creationDataError,
                        description: 'Description should be more than 40 symbols and less than 2048'
                    })
                } else {
                    setCreationDataDirty({...creationDataDirty, description: false})
                    setCreationDataError({...creationDataError, description: ''})
                }
                break
            case "city":
                setCreationData({...creationData, city: e.target.value})
                const regExpCity = /[A-Za-z]{3}[A-Za-z ]*/
                if (!regExpCity.test(String(e.target.value))) {
                    setCreationDataError({...creationDataError, city: 'City is invalid'})
                } else {
                    setCreationDataDirty({...creationDataDirty, city: false})
                    setCreationDataError({...creationDataError, city: ''})
                }
                break
        }
    }

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (creationDataError.image || creationDataError.title || creationDataError.description || creationDataError.city) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [creationDataError])

    const handleSubmit = () => {
        const data = new FormData()
        data.append("_image", creationData.image)
        data.append("_title", creationData.title)
        data.append("_description", creationData.description)
        data.append("_city", creationData.city)
        data.append("_category", creationData.category)
        AdvertisementService.createAdvertisement(data)
            .then(() => {
                setCreationData({
                    city: '',
                    description: '',
                    title: ''
                })
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
                    <Modal.Title>Create advertisement in {category.toLowerCase()} category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control name={'image'} onBlur={event => blurHandler(event)} type="file" multiple
                                          onChange={event => {
                                              dataValidator(event)
                                          }}/>
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.image}>{creationDataError.image}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={creationData.title}
                                name={'title'} onBlur={event => blurHandler(event)}
                                type="text"
                                placeholder="Enter title"
                                autoFocus
                                onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.title}>{creationDataError.title}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={creationData.city}
                                name={'city'} onBlur={event => blurHandler(event)}
                                type="text"
                                placeholder="Enter city"
                                autoFocus
                                onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.city}>{creationDataError.city}</Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            placeholder="Enter description"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={creationData.description}
                                          name={'desc'} onBlur={event => blurHandler(event)}
                                          onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.description}>{creationDataError.description}</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={!formValid}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAdvertisement;