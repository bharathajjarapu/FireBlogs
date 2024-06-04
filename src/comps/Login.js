import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (error) {
            console.error("Error during sign in:", error);
        }
    };

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
            <Row className="text-center">
                <Col>
                    <h1>Welcome to FireBlogs🔥</h1>
                    <p>Your ultimate destination for sharing and exploring blogs.</p>
                    <p>Sign in with Google to start creating and reading amazing blog posts.</p>
                    <Button variant="primary" onClick={handleLogin}>
                        Sign in with Google
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;