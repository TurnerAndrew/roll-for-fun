import React, { useEffect, useState } from 'react'
import Header from '../UI/Header'
import { connect } from 'react-redux'
import {getUserData} from '../../redux/userReducer'
import axios from 'axios'


const Collection = (props) => {

    const {user_id} = props
    const [collection, setCollection] = useState([])


    // console.log(props)

    useEffect (() => {axios.get('/collection', (user_id)).then(res => setCollection(res.data))}, [user_id])

    console.log(collection)

    const collectionMapped = collection.map(game => {
        axios.get('')
        return (
            <div key={game.id} className='game-preview'>
                <img src={game.thumbnail} alt='thumbnail'/>
                <p>{game.title}</p>
            </div>
        )
    })
    

    return (
        <div>
            <Header/>
            <nav>
                <form>
                    <input type='text' placeholder='SEARCH YOUR COLLECTION'></input>
                    <button>SEARCH</button>
                </form>
                <li>ADD GAME</li>
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