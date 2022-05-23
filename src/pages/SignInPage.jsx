import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../service/AuthService";


const SignInPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    })

    const [signInDataDirty, setSignInDataDirty] = useState({
        email: false,
        password: false
    })

    const [signInDataError, setSignInDataError] = useState({
        email: 'Email shouldn\'t be empty',
        password: 'Password shouldn\'t be empty'
    })

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (signInDataError.email || signInDataError.password) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [signInDataError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setSignInDataDirty({...signInDataDirty, email: true})
                break
            case "password":
                setSignInDataDirty({...signInDataDirty, password: true})
        }
    }

    const dataValidator = (e) => {
        switch (e.target.name) {
            case "email":
                setSignInData({...signInData, email: e.target.value})
                const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!regExpEmail.test(String(e.target.value).toLowerCase())) {
                    setSignInDataError({...signInDataError, email: 'Email is invalid'})
                } else {
                    setSignInDataDirty({...signInDataDirty, email: false})
                    setSignInDataError({...signInDataError, email: ''})
                }
                break
            case "password":
                setSignInData({...signInData, password: e.target.value})
                if (e.target.value.length < 5 || e.target.value.length > 30) {
                    setSignInDataError({...signInDataError, password: 'Password is invalid'})
                } else {
                    setSignInDataDirty({...signInDataDirty, password: false})
                    setSignInDataError({...signInDataError, password: ''})
                }
                break
        }
    }

    const signIn = (e) => {
        e.preventDefault()
        AuthService.authenticate(signInData)
            .then(response => {
                localStorage.setItem('accessToken', `Bearer_${response.data.accessToken}`)
                localStorage.setItem('refreshToken', `Bearer_${response.data.refreshToken}`)
                dispatch({type: 'AUTHENTICATE', payload: response.data.userResponseModel})
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className={'col-lg-5 mx-auto my-5 shadow'}>
                        <p align={'center'} className={'h1 mx-auto my-3'}>Sign in</p>
                        <Form className={'p-4'} onSubmit={signIn}>
                            <Row className="mb-3">
                                <Form.Group as={Col} className={'col-12 mx-auto my-2'} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={signInData.email} name={'email'} onBlur={e => blurHandler(e)} type="email"
                                                  placeholder="Enter email" onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signInDataDirty.email}>{signInDataError.email}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} className={'col-12 mx-auto my-2'} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name={'password'} onBlur={e => blurHandler(e)} type="password"
                                                  placeholder="Enter password" onChange={
                                        event => dataValidator(event)
                                    }/>
                                    <Form.Text className={'text-danger'}
                                               hidden={!signInDataDirty.password}>{signInDataError.password}</Form.Text>
                                </Form.Group>
                            </Row>

                            <Row className={'my-4 mx-auto'}>
                                <Button variant="primary" type="submit" disabled={!formValid}>
                                    Sign in
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row style={{height: '5rem'}}>

                </Row>
            </Container>
        </div>
    );
};

export default SignInPage;