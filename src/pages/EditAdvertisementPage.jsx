import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import AdvertisementService from "../service/AdvertisementService";

const EditAdvertisementPage = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [isDataValid, setDataValid] = useState(false)
    const [isChanged, setChanged] = useState({
        title: false,
        description: false,
        city: false
    })
    const [advertisement, setAdvertisement] = useState(
        {
            title: '',
            description: '',
            city: '',
            category: '',
            createdAt: '',
            status: '',
            userResponse: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            }
        }
    )

    const fetchDetails = () => {
        AdvertisementService.getAdvertisementDetails(id)
            .then(response => {
                setAdvertisement(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    const dataValidator = (e) => {
        switch (e.target.name) {
            case "title":
                setChanged({...isChanged, title: true})
                setAdvertisement({...advertisement, title: e.target.value})
                if (e.target.value.length < 5 || e.target.value.length > 50) {
                    setUpdatingDataError({
                        ...updatingDataError,
                        title: 'Title should be more than 5 and less than 50 symbols'
                    })
                } else {
                    setCreationDataDirty({...creationDataDirty, title: false})
                    setUpdatingDataError({...updatingDataError, title: ''})
                }
                break
            case "desc":
                setChanged({...isChanged, description: true})
                setAdvertisement({...advertisement, description: e.target.value})
                if (e.target.value.length < 40 || e.target.value.length > 2048) {
                    setUpdatingDataError({
                        ...updatingDataError,
                        description: 'Description should be more than 40 symbols and less than 2048'
                    })
                } else {
                    setCreationDataDirty({...creationDataDirty, description: false})
                    setUpdatingDataError({...updatingDataError, description: ''})
                }
                break
            case "city":
                setChanged({...isChanged, city: true})
                setAdvertisement({...advertisement, city: e.target.value})
                const regExpCity = /[A-Za-z]{3}[A-Za-z ]*/
                if (!regExpCity.test(String(e.target.value))) {
                    setUpdatingDataError({...updatingDataError, city: 'City is invalid'})
                } else {
                    setCreationDataDirty({...creationDataDirty, city: false})
                    setUpdatingDataError({...updatingDataError, city: ''})
                }
                break
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
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

    const [creationDataDirty, setCreationDataDirty] = useState({
        title: false,
        description: false,
        city: false,
    })

    const [updatingDataError, setUpdatingDataError] = useState({
        title: 'Title shouldn\'t be empty',
        description: 'Description should be more than 40 symbols',
        city: 'City shouldn\'t be empty',
    })

    useEffect(() => {
        if ((updatingDataError.title && isChanged.title)
            || (updatingDataError.description && isChanged.description)
            || (updatingDataError.city && isChanged.city)) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [updatingDataError])

    const handleUpdate = () => {
        const data = {
            id: id,
            title: advertisement.title,
            description: advertisement.description,
            city: advertisement.city,
            category: advertisement.category
        }
        AdvertisementService.updateAdvertisement(data)
            .then(() => navigate(`/advertisements/advertisement/${id}`))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Row className={'d-flex justify-content-center align-items-center mx-auto my-4'}>
                <Col className={'col-6 mx-auto my-auto'}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={advertisement.title}
                                onBlur={event => blurHandler(event)}
                                name={'title'}
                                type="text"
                                placeholder="Enter title"
                                onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.title && !isChanged.title}>{updatingDataError.title}</Form.Text>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            placeholder="Enter description"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={advertisement.description}
                                          name={'desc'}
                                          onBlur={event => blurHandler(event)}
                                          onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.description && !isChanged.description}>{updatingDataError.description}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={advertisement.city}
                                name={'city'}
                                onBlur={event => blurHandler(event)}
                                type="text"
                                placeholder="Enter city"
                                onChange={event => dataValidator(event)}
                            />
                            <Form.Text className={'text-danger'}
                                       hidden={!creationDataDirty.city && !isChanged.city}>{updatingDataError.city}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={event => setAdvertisement({...advertisement, category: event.target.value})} aria-label="Default select example" defaultValue={advertisement.category}>
                                <option value="ITEM">Item</option>
                                <option value="SERVICE">Service</option>
                                <option value="HOUSE">House</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Button className={'my-3'} disabled={!isDataValid} onClick={() => handleUpdate()}>Edit</Button>
                </Col>
            </Row>
        </>
    )
};

export default EditAdvertisementPage;