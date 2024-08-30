import './login.css'
import Logo from './logo.svg'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Login({move}){
    const navigate = useNavigate();
    useEffect(()=>{
        if(document.cookie===''){
            navigate('/login')
        }
        else{
            const username = Cookies.get("LoggedIn")
            axios.post('https://backend-your-hr.vercel.app/username',{username}).then((result)=>{
                if (!(result.data === 'Not Exist')){
                    navigate('/user')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[navigate])
    function handleSubmit(e){
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        axios.post('https://backend-your-hr.vercel.app/login',{username,password}).then((result)=>{
            if(result.data === "Not Exist"){
                alert("User does not exist")
                return
            }
            else if(result.data === "Password"){
                alert("Incorrect Password")
                return
            }
            else{
                Cookies.set("LoggedIn", result.data, { expires: 7, path: '/' })
                navigate('/user')   
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
            <div id='mainLoginDiv'>
                <form onSubmit={handleSubmit}>
                    <img src={Logo} id='usernameUFO' alt='Moving UFO'></img>
                    <input placeholder='Username' onChange={move} id='username'></input>
                    <img src={Logo} id='passwordUFO' alt='Moving UFO'></img>
                    <input placeholder='Password' type='password' onChange={move} id='password'></input>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
