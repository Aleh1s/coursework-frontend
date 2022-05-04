import React, {useState} from 'react';
import {Alert, Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = ({isAuthenticated}) => {

    const [showLogout, setShowLogout] = useState(false)

    const handleLogout = () => {
        setShowLogout(false)
    }

    if (isAuthenticated) {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand><Link className="nav-link active" to={"/"}>Home</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link><Link className="nav-link active" to={"/about"}>About</Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link><Link className="nav-link active" to={"/personal-info"}>Profile</Link></Nav.Link>
                            <Button variant={'danger'} className={'mx-1'} onClick={() => setShowLogout(!showLogout)}>Logout</Button>
                        </Nav>
                    </Container>
                </Navbar>
                <>
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
                </>
            < />
        );
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link className="nav-link active" style={{fontSize: '23px'}}
                                        to={"/"}>Home</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link><Link className="nav-link active" to={"/about"}>About</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant={'primary'} className={'mx-1'}><Link className="nav-link active"
                                                                             to={"/sign-in"}>Sign In</Link></Button>
                        <Button variant={'outline-primary'} className={'mx-1'}><Link className="nav-link active"
                                                                                     to={"/sign-up"}>Sign
                            Up</Link></Button>
                    </Nav>
                </Container>
            </Navbar>
        < />
    );
};

export default NavBar;