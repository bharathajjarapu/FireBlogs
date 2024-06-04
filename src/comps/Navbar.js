import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'react-bootstrap-icons';

const CustomNavbar = ({ theme, toggleTheme, user, handleLogout }) => {
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate('/');
    };

    return (
        <Navbar bg="#0d1117" variant={theme} expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">FireBlogs🔥</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/create">Create Blog</Nav.Link>
                    </Nav>
                    <Nav className="d-flex align-items-center">
                        <Button
                            variant="link"
                            onClick={toggleTheme}
                            style={{ color: theme === 'light' ? 'black' : 'yellow', textDecoration: 'none' }}
                        >
                            {theme === 'light' ? <Moon /> : <Sun />}
                        </Button>
                        {user && (
                            <Dropdown align="end" className="ms-2">
                                <Dropdown.Toggle
                                    as={Button}
                                    variant="link"
                                    style={{ color: theme === 'light' ? 'black' : 'white', textDecoration: 'none' }}
                                >
                                    {user.displayName || "createblog"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;