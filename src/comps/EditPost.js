import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const EditPost = ({ user }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && (docSnap.data().userId === user.uid || user.email === 'admin@example.com')) {
                const data = docSnap.data();
                setTitle(data.title);
                setContent(data.content);
            } else {
                navigate('/home');
            }
        };
        fetchPost();

        const storedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, [id, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, { title, content });
        navigate('/home');
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
                    Update Post
                </Button>
            </Form>
        </Container>
    );
};

export default EditPost;
