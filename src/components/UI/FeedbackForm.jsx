import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import FeedbackService from "../../service/FeedbackService";

const FeedbackForm = () => {

    const [show, setShow] = useState(false)
    const [feedback, setFeedback] = useState({
        email: '',
        text: ''
    })

    const submit = (e) => {
        e.preventDefault()
        FeedbackService.create(feedback)
            .then(() => setShow(true))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                <Col className={'col-12'}>
                    <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Thanks for submitting :)</Alert.Heading>
                        <p>
                            We appreciate it !!!
                        </p>
                    </Alert>
                </Col>
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