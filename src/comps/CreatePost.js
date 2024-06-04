import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const CreatePost = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            await addDoc(collection(db, "posts"), {
                title,
                content,
                author: user.displayName,
                userId: user.uid
            });
            navigate('/home');
        }
    };

    return (
        <Container className="py-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control-dark"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control-dark"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Post
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePost;
