import React, {useState} from 'react'
import Header from '../UI/Header'
import axios from 'axios'

const Home = () => {
    return (
        <main>
        <Header/>
        <div id='home'>
            <section id='top-games'>
                <h1>YOUR TOP RATED GAMES</h1>
            </section>
            <section id='top-games-parties'>
                <h1>TOP GAMES FROM YOUR PARTIES</h1>
            </section>
            <section id='top-others'>
                <h1>BEING PLAYED BY OTHERS</h1>
                
            </section>
        
        </div>
        </main>
    )
}

export default Home