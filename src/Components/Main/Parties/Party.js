import React, {useState, useEffect} from 'react'
import Header from '../../UI/Header'
import UserHeader from '../../UI/UserHeader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import GamePreview from '../GamePreview'

const Party = (props) => {
    const {party_id} = props.match.params
    const [party, setParty] = useState([])
    const [partyName, setPartyName] = useState('')
    const [library, setLibrary] = useState([])

    useEffect (() => {
        axios.get(`/party/${party_id}`).then((res) => {
            console.log(res)
            setParty(res.data.party)
            setPartyName(res.data.party[0].party_name)
            setLibrary(res.data.library)})
    }, [party_id, setParty])

    const members = party.map((party) => {return (
        <h1>{party.username}</h1>
    )})

    const libraryMapped = library.map(game => {
        return <GamePreview game={game} library={library} party={party}/>
    })

    return (
        <div>
            {partyName}
            {members}
            {libraryMapped}
            
        </div>
    )
}

const mapStateToProps = function (state) {
    return state;
  };


export default connect(mapStateToProps)(Party);