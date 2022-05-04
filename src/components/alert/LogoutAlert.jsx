import React from 'react';
import {Alert, Button, Col, Container, Row} from "react-bootstrap";

const LogoutAlert = ({showLogout, setShowLogout, handleLogout}) => {

    return (
        <Container>
            <Row>
                <Col className={'mx-auto col-12'}>
                    <Alert show={showLogout} variant="info">
                        <Alert.Heading>Logout ?</Alert.Heading>
                        <p>
                            Do you want to logout ?
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowLogout(false)} className={'mx-1'} variant="outline-success">
                                No
                            </Button>
                            <Button onClick={handleLogout} className={'mx-1'} variant="outline-danger">
                                Yes
                            </Button>
                        </div>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default LogoutAlert;