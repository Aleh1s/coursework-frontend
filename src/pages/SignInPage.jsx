import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../service/AuthService";


const SignInPage = () => {

    const {user} = useContext(Context)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    })

    const signIn = (e) => {
        e.preventDefault()
        AuthService.authenticate(signInData)
            .then(response => {
                localStorage.setItem('accessToken', `Bearer_${response.data.accessToken}`)
                localStorage.setItem('refreshToken', `Bearer_${response.data.refreshToken}`)
                dispatch({type: 'AUTHENTICATE', payload: response.data.userModel})
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
                                    <Form.Control type="email" placeholder="Enter email" onChange={
                                        event => setSignInData({...signInData, email: event.target.value})
                                    }/>
                                </Form.Group>

                                <Form.Group as={Col} className={'col-12 mx-auto my-2'} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" onChange={
                                        event => setSignInData({...signInData, password: event.target.value})
                                    }/>
                                </Form.Group>
                            </Row>

                            <Row className={'my-4 mx-auto'}>
                                <Button variant="primary" type="submit">
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