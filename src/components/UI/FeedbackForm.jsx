import React, {useEffect, useState} from 'react';
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

    const [feedbackDirty, setFeedbackDirty] = useState({
        email: false,
        text: false
    })

    const [feedbackError, setFeedbackError] = useState({
        email: 'Email shouldn\'t be empty',
        text: 'Text shouldn\'t be empty'
    })

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (feedbackError.email || feedbackError.text) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [feedbackError])

    const blurHandler = (e) => {
        switch (e.target.id) {
            case "email":
                setFeedbackDirty({...feedbackDirty, email: true})
                break
            case "text":
                setFeedbackDirty({...feedbackDirty, text: true})
        }
    }

    const dataValidator = (e) => {
        switch (e.target.id) {
            case "email":
                setFeedback({...feedback, email: e.target.value})
                const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!regExpEmail.test(String(e.target.value).toLowerCase())) {
                    setFeedbackError({...feedbackError, email: 'Email is invalid'})
                } else {
                    setFeedbackDirty({...feedbackDirty, email: false})
                    setFeedbackError({...feedbackError, email: ''})
                }
                break
            case "text":
                setFeedback({...feedback, text: e.target.value})
                if (e.target.value.length < 40) {
                    setFeedbackError({...feedbackError, text: 'Text should be more than 40 symbols'})
                } else {
                    setFeedbackDirty({...feedbackDirty, text: false})
                    setFeedbackError({...feedbackError, text: ''})
                }
                break
        }
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
                <Col className={'mx-auto my-4 col-8 rounded'}>
                    <p className={'h2 p-2'} align={'center'}>Feedback</p>
                    <Form className={'p-3'} onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={feedback.email} id={'email'} onBlur={event => blurHandler(event)} type="email"
                                          placeholder="name@example.com" onChange={
                                event => dataValidator(event)
                            }/>
                            <Form.Text className={'text-danger'}
                                       hidden={!feedbackDirty.email}>{feedbackError.email}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control value={feedback.text} id={'text'} onBlur={event => blurHandler(event)} as="textarea" rows={3}
                                          onChange={
                                              event => dataValidator(event)
                                          }/>
                            <Form.Text className={'text-danger'}
                                       hidden={!feedbackDirty.text}>{feedbackError.text}</Form.Text>
                        </Form.Group>
                        <Button variant={'primary'} type={'submit'} onClick={submit} disabled={!formValid}>Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedbackForm;