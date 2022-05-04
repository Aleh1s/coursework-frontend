import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const SignInPage = () => {

    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    })

    const signIn = () => {

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