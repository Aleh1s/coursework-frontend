import React from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = ({isAuthenticated}) => {
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
                        </Nav>
                    </Container>
                </Navbar>
            < />
        );
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link className="nav-link active" style={{fontSize: '23px'}} to={"/"}>Home</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link><Link className="nav-link active" to={"/about"}>About</Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link><Link className="nav-link active" to={"/sign-in"}>Sign In</Link></Nav.Link>
                            <Nav.Link><Link className="nav-link active" to={"/sign-up"}>Sign Up</Link></Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
        < />
    );
};

export default NavBar;