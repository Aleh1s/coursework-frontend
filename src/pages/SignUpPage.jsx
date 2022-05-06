import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import ServerErrorAlert from "../components/alert/ServerErrorAlert";
import AuthService from "../service/AuthService";

const SignUpPage = () => {

    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [serverError, setServerError] = useState({
        show: false,
        message: ''
    })
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        postNumber: '',
        phoneNumber: '',
        dob: '',
    })
    const signUp = (e) => {
        e.preventDefault()
        AuthService.register(signUpData)
            .then(response => response.status === 201 ? navigate('/sign-in') : handleShowServerErrorAlert('Unknown exception'))
            .catch(err => {
                handleShowServerErrorAlert(err.response.data.message)
                window.scrollTo(0,0)
            })
    }

    const handleShowServerErrorAlert = (message) => setServerError({...serverError, show: true, message: message})
    const handleCloseServerErrorAlert = () => setServerError({...serverError, show: false, message: ''})

    return (
        <div>
            <Container>
                <Row>
                    <ServerErrorAlert show={serverError.show} onHide={handleCloseServerErrorAlert} message={serverError.message}/>
                </Row>
                <Row>
                    <Col className={'col-lg-5 mx-auto my-5 shadow'}>
                        <p align={'center'} className={'h1 mx-auto my-3'}>Sign up</p>
                        <Form className={'p-4'} onSubmit={signUp}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={signUpData.email} onChange={
                                        event => setSignUpData({...signUpData, email: event.target.value})
                                    }/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" value={signUpData.password} onChange={
                                        event => setSignUpData({...signUpData, password: event.target.value})
                                    }/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control placeholder="Enter first name" value={signUpData.firstName} onChange={
                                        event => setSignUpData({...signUpData, firstName: event.target.value})
                                    }/>
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control placeholder="Enter last name" value={signUpData.lastName} onChange={
                                        event => setSignUpData({...signUpData, lastName: event.target.value})
                                    }/>
                                </Form.Group>
                            </Row>

                            <Form.Group as={Col} className="mb-3" controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="London" value={signUpData.city} onChange={
                                    event => setSignUpData({...signUpData, city: event.target.value})
                                }/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="street, house number, apartment number" value={signUpData.address} onChange={
                                    event => setSignUpData({...signUpData, address: event.target.value})
                                }/>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Post number</Form.Label>
                                    <Form.Control placeholder="number" value={signUpData.postNumber} onChange={
                                        event => setSignUpData({...signUpData, postNumber: event.target.value})
                                    }/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control placeholder={'+380XXXXXXXXX'} value={signUpData.phoneNumber} onChange={
                                        event => setSignUpData({...signUpData, phoneNumber: event.target.value})
                                    }/>
                                </Form.Group>
                            </Row>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Date of birthday</Form.Label>
                                <Form.Control placeholder={'Example: YYYY-MM-DD'} value={signUpData.dob} onChange={
                                    event => setSignUpData({...signUpData, dob: event.target.value})
                                }/>
                            </Form.Group>

                            <Row className={'my-4 mx-auto'}>
                                <Button variant="primary" type="submit">
                                    Sign up
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUpPage;