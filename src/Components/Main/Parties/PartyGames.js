import React, { useEffect, useState } from 'react'
import axios from 'axios'


const PartyGames = (props) => {
    const [topGames, setTopGames] = useState([])
    const party_id = props

    useEffect (()=> {
        axios.get("/library/topbyparty").then((res) => setTopGames(res.data))
    }, [party_id])

    return (
        <div>
            {topGames}
        </div>
    )

}

export default PartyGames