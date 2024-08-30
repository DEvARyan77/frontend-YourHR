import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllUsers.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://backend-your-hr.vercel.app/allresume');
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        // Remove the "LoggedIn" cookie
        Cookies.remove("LoggedIn");
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="user-list">
            <h1>All Users</h1>
            <button onClick={handleLogout}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Skills</th>
                        <th>Experience</th>
                        <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.Username}>
                            <td>{user.Username}</td>
                            <td>{user.skills}</td>
                            <td>{user.experience}</td>
                            <td>
                                {user.fileUrl ? (
                                    <a href={user.fileUrl} target="_blank" rel="noopener noreferrer">
                                        View Resume
                                    </a>
                                ) : (
                                    'No Resume'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
