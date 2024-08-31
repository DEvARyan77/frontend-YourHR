import { useState, useEffect } from 'react';
import './User.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const checkLoginAndFetchPdf = async () => {
            if (!Cookies.get("LoggedIn")) {
                navigate('/login');
            } else {
                const username = Cookies.get("LoggedIn");
                
                try {
                    const result = await axios.post('https://backend-your-hr.vercel.app/username', { username });
                    if (result.data === 'Not Exist') {
                        navigate('/');
                        return
                    }
                    if(result.data.hr === true){
                        navigate('/alluser')
                    }
                    setUserInfo(result.data);
                    setPdfUrl(`https://backend-your-hr.vercel.app/downloads/${result.data.fileid}`)
                } catch (err) {
                    console.error('Error checking username:', err);
                }
            }
        };

        checkLoginAndFetchPdf();
    }, [navigate]);

    async function handleSubmit(e){
        e.preventDefault()
        const resume = document.getElementById('resume').files[0]
        if(resume){
            const formData = new FormData()
            formData.append('file',resume)
            formData.append('username',userInfo?.username)
            console.log(resume)
            await axios.post('https://backend-your-hr.vercel.app/upload',formData).then((result)=>{
                console.log(result.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
        window.location.reload();
    }
    const handleLogout = () => {
        // Remove the "LoggedIn" cookie
        Cookies.remove("LoggedIn");
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div id='userPage'>
            <h1>Hello, {userInfo?.username}</h1>
            <button onClick={handleLogout}>Logout</button>
            {userInfo && (
                <div className="user-details">
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Skills:</strong> {userInfo.skills}</p>
                    <p><strong>Experience:</strong> {userInfo.experience}</p>
                </div>
            )}
            <br />
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                />
            ) : (
                <p>Loading PDF...</p>
            )}
            <form onSubmit={handleSubmit}>
                <p>Change Resume:</p>
                <input type='file' accept='.pdf' id='resume'></input>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default User;
