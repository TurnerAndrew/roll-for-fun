import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import axios from 'axios'

const Signin = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        setUserData({
            username: username,
            password: password,
        })
        axios.post('/auth/signin', userData)
    }

    return (
        <div id='signin-page'>
            <section id='signin-container'>
                <h1>SIGN IN</h1>
                <form id='signin'>
                <input
                    type='text'
                    placeholder='USERNAME'
                    className='form-input'
                    onChange={(e) => setUsername(e.target.value)}></input>
                <input
                    type='password'
                    placeholder='PASSWORD'
                    className='form-input'
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                    type='button'
                    id='signin-button'
                    onClick={login}>
                        SIGN IN
                    </button>
                </form>
            </section>
        </div>
    )

}

export default Signin