import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import OrdersService from "../../service/OrdersService";

const ModalItemForm = (props) => {

    const id = useSelector(state => state.advertisementId)
    const user = useSelector(state => state.user)
    const [orderData, setOrderData] = useState({
        advertisementId: id,
        deliveryCity: '',
        deliveryAddress: '',
        deliveryPostOffice: '',
        wishes: ''
    })

    const submitForm = (e) => {
        e.preventDefault()
        OrdersService.makeOrder(orderData)
            .then(() => props.onHide())
            .catch(err => console.log(err))
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
                            event => setOrderData({...orderData, deliveryCity: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" onChange={
                            event => setOrderData({...orderData, deliveryAddress: event.target.value})
                        }/>
                        <Form.Text className="text-muted">
                            We'll never share your address with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPost">
                        <Form.Label>Post number</Form.Label>
                        <Form.Control type="text" placeholder="Enter post number" onChange={
                            event => setOrderData({...orderData, deliveryPostOffice: event.target.value})
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

export default ModalItemForm;