import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface PropData {
    logoutHandler: Function;
    isLogin: boolean;
}

const Header = (props: PropData) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setLogin(props.isLogin);
    }, [props.isLogin])

    const onLogout = () => {
        localStorage.clear()
        props.logoutHandler();
        navigate("/login");
    }

    return (
        login ? <></> :
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            props.isLogin ?
                                <>
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                    <Nav.Link href="#" onClick={() => onLogout()}>Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">Signup</Nav.Link>
                                </>
                        }

                    </Nav>
                </Container>
            </Navbar>
    )
}

export default Header