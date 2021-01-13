import React, {useState} from 'react'
import Header from '../../UI/Header'
import UserHeader from '../../UI/UserHeader'
import {connect} from 'react-redux'
import {getUserData} from '../../../redux/userReducer'
import axios from 'axios'

const Create = (props) => {

    const {user_id} = props
    const [party_name, setPartyName] = useState('')

    const createParty = () => {
        axios.post('/parties/create', {user_id, party_name})
    }

    return (
        <div>
            {props.isLoggedIn ? <UserHeader/> :<Header/>}
            <h1>CREATE A PARTY</h1>
            <form>
                <input type='text' placeholder='PARTY NAME' onChange={(e) => setPartyName(e.target.value)}></input>
                <button type='submit' onClick={createParty}></button>
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return {
        user: state
    }
}

export default connect (mapStateToProps, {getUserData})(Create)