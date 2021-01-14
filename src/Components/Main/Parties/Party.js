import React, {useState, useEffect} from 'react'
import Header from '../../UI/Header'
import UserHeader from '../../UI/UserHeader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

const Party = (props) => {
    const {party_id} = props.match.params
    const {party_name} = props
    const [party, setParty] = useState([])
    const [partyName, setPartyName] = useState('')

    useEffect (() => {
        axios.get(`/party/${party_id}`).then((res) => {
            setParty(res.data.party)
            setPartyName(res.data.partyName)})
    }, [party_id, setParty])

    console.log(partyName)

    const members = party.map((party) => {return (
        <h1>{party.username}</h1>
    )})

    return (
        <div>
            
            {members} 
            
        </div>
    )
}

const mapStateToProps = function (state) {
    return state;
  };


export default connect(mapStateToProps)(Party);