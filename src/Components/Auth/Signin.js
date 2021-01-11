import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserData} from '../../redux/userReducer'

const Signin = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
       
        axios.post('/auth/signin', {username, password}).then((res) => {
            props.getUserData(res.data)
        })
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
                <div>
                    <p>Don't have an account?  Register <Link to='/register'>here!</Link></p>
                </div>
            </section>
        </div>
    )

}

function mapStateToProps(state){
    return {
        user: state.user
    }
    
}

export default connect(mapStateToProps, {getUserData})(Signin)