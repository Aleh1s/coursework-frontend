import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import ServerErrorAlert from "../components/alert/ServerErrorAlert";
import AuthService from "../service/AuthService";

const SignUpPage = () => {

    const navigate = useNavigate()
    const [serverError, setServerError] = useState({
        show: false,
        message: ''
    })
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    })

    const [signUpDataDirty, setSignUpDataDirty] = useState({
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
    })

    const [signUpDataError, setSignUpDataError] = useState({
        email: 'Email shouldn\'t be empty',
        password: 'Password shouldn\'t be empty',
        firstName: 'First name shouldn\'t be empty',
        lastName: 'Last name shouldn\'t be empty',
        phoneNumber: 'Phone number shouldn\'t be empty',
    })

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (signUpDataError.email || signUpDataError.password || signUpDataError.firstName || signUpDataError.lastName || signUpDataError.phoneNumber) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [signUpDataError])

    const signUp = (e) => {
        e.preventDefault()
        setSignUpData({
            ...signUpData, email: signUpData.email.trim()
        })
        AuthService.register(signUpData)
            .then(() => {
                navigate('/sign-in')
            })
            .catch(err => {
                handleShowErrorAlert(err.response.data.message)
                window.scrollTo(0, 0)
            })
    }

    const handleShowErrorAlert = (message) => setServerError({...serverError, show: true, message: message})
    const handleCloseErrorAlert = () => setServerError({...serverError, show: false, message: ''})

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setSignUpDataDirty({...signUpDataDirty, email: true})
                break
            case "password":
                setSignUpDataDirty({...signUpDataDirty, password: true})
                break
            case "firstName":
                setSignUpDataDirty({...signUpDataDirty, firstName: true})
                break
            case "lastName":
                setSignUpDataDirty({...signUpDataDirty, lastName: true})
                break
            case "phoneNumber":
                setSignUpDataDirty({...signUpDataDirty, phoneNumber: true})
                break
        }
    }

    const dataValidator = (e) => {
        switch (e.target.name) {
            case "email":
                setSignUpData({...signUpData, email: e.target.value})
                const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im
                if (!regExpEmail.test(String(e.target.value).toLowerCase())) {
                    setSignUpDataError({...signUpDataError, email: 'Email is invalid'})
                } else {
                    setSignUpDataDirty({...signUpDataDirty, email: false})
                    setSignUpDataError({...signUpDataError, email: ''})
                }
                break
            case "password":
                setSignUpData({...signUpData, password: e.target.value})
                const passwordRegex = /\b[A-Za-z\d!@#$%^&*()-_+=?<>|\\"'.,~`]{5,50}\b/im;
                if (!passwordRegex.test(String(e.target.value))) {
                    setSignUpDataError({...signUpDataError, password: 'Password format is invalid'})
                } else {
                    setSignUpDataDirty({...signUpDataDirty, password: false})
                    setSignUpDataError({...signUpDataError, password: ''})
                }
                break
            case "firstName":
                setSignUpData({...signUpData, firstName: e.target.value})
                const regExpFirstName = /^[A-Za-z][A-Za-z ]{2,40}[A-Za-z]$/im
                if (!regExpFirstName.test(String(e.target.value))) {
                    setSignUpDataError({...signUpDataError, firstName: 'First name should contains only latin symbols'})
                } else {
                    setSignUpDataDirty({...signUpDataDirty, firstName: false})
                    setSignUpDataError({...signUpDataError, firstName: ''})
                }
                break
            case "lastName":
                setSignUpData({...signUpData, lastName: e.target.value})
                const regExpLastName = /^[A-Za-z][A-Za-z ]{2,40}[A-Za-z]$/im
                if (!regExpLastName.test(String(e.target.value))) {
                    setSignUpDataError({...signUpDataError, lastName: 'Last name should contains only latin symbols'})
                } else {
                    setSignUpDataDirty({...signUpDataDirty, lastName: false})
                    setSignUpDataError({...signUpDataError, lastName: ''})
                }
                break
            case "phoneNumber":
                setSignUpData({...signUpData, phoneNumber: e.target.value})
                const regExpPhoneNumber = /^(\+38)?0\d{9}$/im
                if (!regExpPhoneNumber.test(String(e.target.value))) {
                    setSignUpDataError({...signUpDataError, phoneNumber: 'Phone number is invalid'})
                } else {
                    setSignUpDataDirty({...signUpDataDirty, phoneNumber: false})
                    setSignUpDataError({...signUpDataError, phoneNumber: ''})
                }
                break
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <ServerErrorAlert show={serverError.show} onHide={handleCloseErrorAlert}
                                      message={serverError.message}/>
                </Row>
                <Row>
                    <Col className={'col-lg-5 mx-auto my-5 shadow'}>
                        <p align={'center'} className={'h1 mx-auto my-3'}>Sign up</p>
                        <Form className={'p-4'} onSubmit={signUp}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name={'email'} onBlur={e => blurHandler(e)} type="email"
                                                  placeholder="Enter email" value={signUpData.email} onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signUpDataDirty.email}>{signUpDataError.email}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name={'password'} onBlur={e => blurHandler(e)} type="password"
                                                  placeholder="Enter password" value={signUpData.password} onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signUpDataDirty.password}>{signUpDataError.password}</Form.Text>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control name={'firstName'} onBlur={e => blurHandler(e)}
                                                  placeholder="Enter first name" value={signUpData.firstName} onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signUpDataDirty.firstName}>{signUpDataError.firstName}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control name={'lastName'} onBlur={e => blurHandler(e)}
                                                  placeholder="Enter last name" value={signUpData.lastName} onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signUpDataDirty.lastName}>{signUpDataError.lastName}</Form.Text>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control name={'phoneNumber'} onBlur={e => blurHandler(e)}
                                                  placeholder={'+380XXXXXXXXX'} value={signUpData.phoneNumber}
                                                  onChange={
                                                      event => dataValidator(event)}/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signUpDataDirty.phoneNumber}>{signUpDataError.phoneNumber}</Form.Text>
                                </Form.Group>
                            </Row>

                            <Row className={'my-4 mx-auto'}>
                                <Button variant="primary" type="submit" disabled={!formValid}>
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