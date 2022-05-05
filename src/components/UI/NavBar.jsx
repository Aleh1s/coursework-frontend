import React, {useContext, useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import LogoutAlert from "../alert/LogoutAlert";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "../../service/AuthService";
import {Context} from "../../index";

const NavBar = () => {

    const {user} = useContext(Context)
    const [showLogout, setShowLogout] = useState(false)
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        setShowLogout(false)
        user.logout(dispatcher, navigate)
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
                            <Nav.Link><Link className="nav-link active"
                                            to={"/personal-info"}>Profile</Link></Nav.Link>
                            <Button variant={'danger'} className={'mx-1'}
                                    onClick={() => setShowLogout(!showLogout)}>Logout</Button>
                        </Nav>
                    </Container>
                </Navbar>
                <LogoutAlert showLogout={showLogout} setShowLogout={setShowLogout} handleLogout={handleLogout}/>
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