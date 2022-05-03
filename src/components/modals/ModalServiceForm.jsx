import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ModalServiceForm = (props) => {

    const [orderData, setOrderData] = useState({
        fullName: '',
        phoneNumber: '',
        city: '',
        address: '',
        wishes: ''
    })

    const submitForm = (e) => {
        e.preventDefault()
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
                    Order service
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Full name" onChange={
                            event => setOrderData({...orderData, fullName: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Phone number" onChange={
                            event => setOrderData({...orderData, phoneNumber: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
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

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Wishes</Form.Label>
                        <Form.Control as="textarea" placeholder={'Enter some extra wishes'} rows={3} onChange={
                            event => setOrderData({...orderData, wishes: event.target.value})
                        }/>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalServiceForm;