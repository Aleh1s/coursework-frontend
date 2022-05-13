import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import OrdersService from "../../service/OrdersService";

const ModalItemForm = (props) => {

    const id = useSelector(state => state.advertisementId)
    const [orderData, setOrderData] = useState({
        advertisementId: id,
        city: null,
        address: null,
        postNumber: null,
        wishes: null,
        orderCategory: 'ITEM'
    })

    const submitForm = (e) => {
        e.preventDefault()
        OrdersService.makeOrder(orderData)
            .then(response => console.log(response))
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
                    Order item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" onChange={
                            event => setOrderData({...orderData, firstName: event.target.value})
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={
                            event => setOrderData({...orderData, lastName: event.target.value})
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Post number</Form.Label>
                        <Form.Control type="text" placeholder="Enter post number" onChange={
                            event => setOrderData({...orderData, postNumber: event.target.value})
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