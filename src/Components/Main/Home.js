import React, {useState} from 'react'
import Header from '../UI/Header'
import UserHeader from '../UI/UserHeader'
import axios from 'axios'
import {connect} from 'react-redux'

const Home = (props) => {
    if(!props.isLoggedIn) {
        props.history.push('/signin')
      }
    return (
        <main>
        {props.isLoggedIn ? <UserHeader/> :<Header/>}
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

const mapStateToProps = function (state) {
    return state;
  };

export default connect(mapStateToProps)(Home)