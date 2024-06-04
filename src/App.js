import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from './comps/Navbar';
import Home from './comps/Home';
import Login from './comps/Login';
import CreatePost from './comps/CreatePost';
import BlogPost from './comps/BlogPost';
import EditPost from './comps/EditPost';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            } else {
                localStorage.removeItem('user');
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        localStorage.removeItem('user');
        setUser(null);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <Navbar theme={theme} toggleTheme={toggleTheme} user={user} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={user ? <Home user={user} /> : <Login />} />
                    <Route path="/home" element={<Home user={user} />} />
                    <Route path="/create" element={<CreatePost user={user} />} />
                    <Route path="/post/:id" element={<BlogPost />} />
                    <Route path="/edit/:id" element={<EditPost user={user} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;