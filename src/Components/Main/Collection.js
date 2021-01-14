import React, { useEffect, useState } from 'react'
import Header from '../UI/Header'
import UserHeader from '../UI/UserHeader'
import { connect } from 'react-redux'
import {getUserData} from '../../redux/userReducer'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Collection = (props) => {

    const {isLoggedIn} = props

    if(isLoggedIn == false) {
        props.history.push('/signin')
      }

    const {user_id} = props
    const [collection, setCollection] = useState([])


    // console.log(props)

    useEffect (() => {axios.get('/collection', (user_id)).then(res => setCollection(res.data))}, [user_id])

    console.log(collection)

    const collectionMapped = collection.map(game => {

        return (
            <div key={game.id} className='game-preview'>
                <img src={game.thumbnail} alt='thumbnail'/>
                <p>{game.title}</p>
                <Link to={`/game/${game.bga_id}`}>
                <button>View Details</button>
                </Link>
            </div>
        )
    })
    

    return (
        <div>
            {isLoggedIn ? <UserHeader/> :<Header/>}
            <nav>
                <form>
                    <input type='text' placeholder='SEARCH YOUR COLLECTION'></input>
                    <button>SEARCH</button>
                </form>
                <Link to='/addgame'><h3>ADD GAME</h3></Link>
                <li>DELETE GAME</li>
            </nav>
            {collectionMapped}
        </div>
    )
}

function mapStateToProps(state){
    return {
        user: state
    }
}

export default connect (mapStateToProps, {getUserData})(Collection)