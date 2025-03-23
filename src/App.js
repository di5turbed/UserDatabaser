import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
                const usersData = await usersResponse.json();
                setUsers(usersData);

                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const postsData = await postsResponse.json();
                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
    };

    const selectedUser = users.find(user => user.id === selectedUserId);
    const userPosts = selectedUserId ? posts.filter(post => post.userId === selectedUserId) : [];

    return (
        <div className="container">
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id)}>
                        {user.name}
                    </div>
                ))}
            </div>
            <div className="post-list">
                {selectedUser && (
                    <div className="user-info">
                        <h2>{selectedUser.name}</h2>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p><strong>Website:</strong> {selectedUser.website}</p>
                        <p><strong>Address:</strong> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                        <p><strong>Company:</strong> {selectedUser.company.name}</p>
                    </div>
                )}
                {userPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;