import React, {useEffect} from 'react'
import Header from '../../UI/Header'
import {connect} from 'react-redux'
import {getUserData} from '../../../redux/userReducer'
import axios from 'axios'

const Parties = (props) => {
    const {user_id} = props

    useEffect (() => {
        axios.get('/parties', user_id)
    }, [user_id])


    return (
        <div>
            <Header/>
            <nav>
                <h2>PARTIES</h2>
                <li>CREATE</li>
                <li>JOIN</li>
                <h3>YOUR PARTIES</h3>
                {/* mapped parties */}
            </nav>
        </div>
    )
    
}

function mapStateToProps(state){
    return {
        user: state
    }
}

export default connect (mapStateToProps, {getUserData})(Parties)


