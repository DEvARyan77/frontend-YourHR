import Logo from './logo.svg'
import './Signup.css'
import axios from 'axios'

function Signup({move}){
    function handleSubmit(e){
        e.preventDefault()
        const username = document.getElementById('username').value
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const resume = document.getElementById('resume').files[0]
        axios.post('https://backend-your-hr.vercel.app/signup',{username,name,email,password}).then((result)=>{
            if (result.data === 'Length'){
                alert('Password length is small')
                return
            }
            else if (result.data === 'Username Exist'){
                alert('Username Exist')
                return
            }
            else if (result.data === 'Fields'){
                alert('Check the input fields')
                return
            }
            if(resume){
                const formData = new FormData()
                formData.append('file',resume)
                console.log(resume)
                formData.append('username',username)
                console.log(username)
                axios.post('https://backend-your-hr.vercel.app/upload',formData).catch((err)=>{
                    console.log(err)
                })
            }
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div>
            <div id='mainSignupDiv'>
                <form onSubmit={handleSubmit}>
                    <img src={Logo} id='usernameUFO' alt='Moving UFO'></img>
                    <input placeholder='Username' onChange={move} id='username' required minLength={3}></input>
                    <img src={Logo} id='nameUFO' alt='Moving UFO'></img>
                    <input placeholder='Name' onChange={move} id='name' required minLength={3}></input>
                    <img src={Logo} id='emailUFO' alt='Moving UFO'></img>
                    <input placeholder='Email' onChange={move} id='email' required></input>
                    <img src={Logo} id='passwordUFO' alt='Moving UFO'></img>
                    <input placeholder='Password' type='password' onChange={move} id='password' style={{ marginBottom: '30px' }} required minLength={8}></input><br></br>
                    <input type='file' accept='.pdf' id='resume'></input>
                    <button>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
