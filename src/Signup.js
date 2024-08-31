import Logo from './logo.svg';
import './Signup.css';
import axios from 'axios';
import { useState } from 'react';

function Signup({ move }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const resume = document.getElementById('resume').files[0];

        try {
            // Send the user data first
            const result = await axios.post('https://backend-your-hr.vercel.app/signup', { username, name, email, password });

            if (result.data === 'Length') {
                alert('Password length is small');
                setLoading(false);
                return;
            }
            if (result.data === 'Username Exist') {
                alert('Username Exist');
                setLoading(false);
                return;
            }
            if (result.data === 'Fields') {
                alert('Check the input fields');
                setLoading(false);
                return;
            }

            // If there is a resume file, upload it
            if (resume) {
                const formData = new FormData();
                formData.append('file', resume);
                formData.append('username', username);

                try {
                    await axios.post('https://backend-your-hr.vercel.app/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                } catch (err) {
                    console.error('Error uploading file:', err);
                }
            }

            // Reload or redirect as needed
            window.location.reload();
        } catch (err) {
            console.error('Error signing up:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div id='mainSignupDiv'>
                <form onSubmit={handleSubmit}>
                    <img src={Logo} id='usernameUFO' alt='Moving UFO' />
                    <input placeholder='Username' onChange={move} id='username' required minLength={3} />
                    <img src={Logo} id='nameUFO' alt='Moving UFO' />
                    <input placeholder='Name' onChange={move} id='name' required minLength={3} />
                    <img src={Logo} id='emailUFO' alt='Moving UFO' />
                    <input placeholder='Email' onChange={move} id='email' required />
                    <img src={Logo} id='passwordUFO' alt='Moving UFO' />
                    <input placeholder='Password' type='password' onChange={move} id='password' style={{ marginBottom: '30px' }} required minLength={8} /><br />
                    <input type='file' accept='.pdf' id='resume' />
                    <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
