import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import OrdersService from "../../service/OrdersService";

const ModalCreateItemOrderForm = (props) => {

    const id = useSelector(state => state.advertisementId)
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

    const submitForm = (e) => {
        e.preventDefault()
        OrdersService.makeOrder(orderData)
            .then(() => props.onHide())
            .catch(err => onError(err.response.data.message))
    }

    const onError = (message) => {
        setError({...error, showAlert: true, message: message})
    }

    return (
        <Modal
            {...props}
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
                        <Form.Control type="text" placeholder="Enter city" onChange={
                            event => setOrderData({...orderData, city: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" onChange={
                            event => setOrderData({...orderData, address: event.target.value})
                        }/>
                        <Form.Text className="text-muted">
                            We'll never share your address with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPost">
                        <Form.Label>Post office</Form.Label>
                        <Form.Control type="text" placeholder="Enter post number" onChange={
                            event => setOrderData({...orderData, postOffice: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Wishes</Form.Label>
                        <Form.Control as="textarea" placeholder={'Enter some extra wishes'} rows={3} onChange={
                            event => setOrderData({...orderData, wishes: event.target.value})
                        }/>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateItemOrderForm;