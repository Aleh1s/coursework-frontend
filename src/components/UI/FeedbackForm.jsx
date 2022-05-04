import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const FeedbackForm = () => {

    const [feedback, setFeedback] = useState({
        email: '',
        text: ''
    })

    const submit = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <Row>
                <Col className={'mx-auto my-4 col-8 rounded'} >
                    <p className={'h2 p-2'} align={'center'}>Feedback</p>
                    <Form className={'p-3'} onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" onChange={
                                event => setFeedback({...feedback, email: event.target.value})
                            }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={
                                event => setFeedback({...feedback, text: event.target.value})
                            }/>
                        </Form.Group>
                        <Button variant={'primary'} type={'submit'} onClick={submit}>Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedbackForm;