import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import OrdersService from "../../service/OrdersService";

const ModalMakeOrder = ({show, onHide, setNotification}) => {

    const id = useSelector(state => state.id.advertisement)
    const user = useSelector(state => state.user)
    const [error, setError] = useState({
        showAlert: false,
        message: ''
    })

    const [orderData, setOrderData] = useState({
        advertisementId: id,
        city: '',
        address: '',
        postOffice: '',
        wishes: ''
    })

    const [orderDataDirty, setOrderDataDirty] = useState({
        city: false,
        address: false,
        postOffice: false
    })

    const [orderDataError, setOrderDataError] = useState({
        city: 'City can not be empty',
        address: 'Address can not be empty',
        postOffice: 'Post office can not be empty'
    })

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'city':
                setOrderDataDirty({...orderDataDirty, city: true})
                break
            case 'address':
                setOrderDataDirty({...orderDataDirty, address: true})
                break
            case 'postOffice':
                setOrderDataDirty({...orderDataDirty, postOffice: true})
                break
        }
    }

    const addressPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Writing rules</Popover.Header>
            <Popover.Body>
                The correct format is: <strong>S StreetName 10 - HN 2 - FN 10</strong>, where S - street, HN - house
                number
                FN - flat number. <strong style={{color: "red"}}>All spaces and dashes are necessary !!!</strong>
            </Popover.Body>
        </Popover>
    );

    const postOfficePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Writing rules</Popover.Header>
            <Popover.Body>
                The correct format is: <strong>N name - ON 10</strong>, where N - name, ON - office number. <strong
                style={{color: "red"}}>All spaces and dashes are necessary !!!</strong>
            </Popover.Body>
        </Popover>
    );


    const dataValidator = (e) => {
        switch (e.target.name) {
            case 'city':
                setOrderData({...orderData, city: e.target.value})
                if (e.target.value.length < 3) {
                    setOrderDataError({...orderDataError, city: 'City can not be less than 3 symbols'})
                } else {
                    setOrderDataDirty({...orderDataDirty, city: false})
                    setOrderDataError({...orderDataError, city: ''})
                }
                break
            case 'address':
                setOrderData({...orderData, address: e.target.value})
                const rexExpAddress = /S [A-Za-z]+ \d+? - HN \d+ - FN \d+/
                if (!rexExpAddress.test(String(e.target.value))) {
                    setOrderDataError({...orderDataError, address: 'Invalid address'})
                } else {
                    setOrderDataDirty({...orderDataDirty, address: false})
                    setOrderDataError({...orderDataError, address: ''})
                }
                break
            case 'postOffice':
                setOrderData({...orderData, postOffice: e.target.value})
                const rexExpPostOffice = /N [A-Za-z ]+ - ON \d+/
                if (!rexExpPostOffice.test(String(e.target.value))) {
                    setOrderDataError({...orderDataError, postOffice: 'Invalid post office'})
                } else {
                    setOrderDataDirty({...orderDataDirty, postOffice: false})
                    setOrderDataError({...orderDataError, postOffice: ''})
                }
                break
        }
    }

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (orderDataError.city || orderDataError.address || orderDataError.postOffice) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [orderDataError])

    const submitForm = (e) => {
        e.preventDefault()
        OrdersService.makeOrder(orderData)
            .then(() => {
                setNotification({show: true, message: 'Order was added to your orders'})
                window.scrollTo(0, 0)
                onHide()
            })
            .catch(err => onError(err.response.data.message))
    }

    const onError = (message) => {
        setError({...error, showAlert: true, message: message})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className={'d-flex justify-content-start align-items-start'}>
                    <Col className={'col-12'}>
                        <Col className={'col-12'}>
                            <Alert show={error.showAlert} key={'danger'} variant={'danger'}>
                                {error.message}
                            </Alert>
                        </Col>
                    </Col>
                    <Col className={'d-flex justify-content-start align-items-start col-12'}>
                        <p>First name: <strong>{user.firstName}</strong></p>
                    </Col>
                    <Col className={'d-flex justify-content-start align-items-start col-12'}>
                        <p>Last name: <strong>{user.lastName}</strong></p>
                    </Col>
                    <Col className={'d-flex justify-content-start align-items-start col-12'}>
                        <p>Phone number: <strong>{user.phoneNumber}</strong></p>
                    </Col>
                </Row>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={orderData.city} name={'city'} onBlur={event => blurHandler(event)}
                                      type="text" placeholder="Enter city" onChange={
                            event => dataValidator(event)
                        }/>
                        <Form.Text className={'text-danger'}
                                   hidden={!orderDataDirty.city}>{orderDataError.city}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={addressPopover}>
                            <Form.Control value={orderData.address} name={'address'}
                                          onBlur={event => blurHandler(event)}
                                          type="text" placeholder="Enter address" onChange={
                                event => dataValidator(event)
                            }/>
                        </OverlayTrigger>
                        <Form.Text className="text-muted">
                            We'll never share your address with anyone else.
                        </Form.Text>
                        <Form.Text className={'text-danger'}
                                   hidden={!orderDataDirty.address}>{orderDataError.address}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPost">
                        <Form.Label>Post office</Form.Label>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={postOfficePopover}>
                        <Form.Control value={orderData.postOffice} name={'postOffice'}
                                      onBlur={event => blurHandler(event)} type="text" placeholder="Enter post number"
                                      onChange={
                                          event => dataValidator(event)
                                      }/>
                        </OverlayTrigger>
                        <Form.Text className={'text-danger'}
                                   hidden={!orderDataDirty.postOffice}>{orderDataError.postOffice}</Form.Text>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Wishes</Form.Label>
                        <Form.Control value={orderData.wishes} as="textarea" placeholder={'Enter some extra wishes'}
                                      rows={3} onChange={
                            event => setOrderData({...orderData, wishes: event.target.value})
                        }/>
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={!formValid}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalMakeOrder;