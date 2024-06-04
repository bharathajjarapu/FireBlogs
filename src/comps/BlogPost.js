import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col } from 'react-bootstrap';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.error("No such document!");
            }
        };
        fetchPost();
    }, [id]);

    return (
        <Container className="py-5">
            {post && (
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <h1 className="text-center mb-4">{post.title}</h1>
                        <p className="text-muted text-center mb-4">by {post.author}</p>
                        <div className="blog-content">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BlogPost;