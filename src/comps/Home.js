import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [theme, setTheme] = useState('dark');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchPosts();

        const storedTheme = localStorage.getItem('theme');
        const defaultTheme = storedTheme ? storedTheme : 'dark';
        setTheme(defaultTheme);
        document.documentElement.setAttribute('data-theme', defaultTheme);
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div className={`app-container ${theme}`}>
            <Container fluid className="py-5" style={{ paddingTop: '56px' }}>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {posts.map(post => (
                        <div className="col" key={post.id}>
                            <Card onClick={() => navigate(`/post/${post.id}`)} className="post-card">
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>by {post.author}</Card.Text>
                                </Card.Body>
                                {user && (user.uid === post.userId || user.email === 'thisisbillionaire@gmail.com') && (
                                    <Card.Footer>
                                        <Button variant="warning" size="sm" className="me-2" onClick={(e) => { e.stopPropagation(); navigate(`/edit/${post.id}`); }}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}>
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                )}
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;