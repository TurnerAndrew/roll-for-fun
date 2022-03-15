import Header from './Header'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getUserData } from '../../redux/userReducer'

const Landing = (props) => {
  if(props.isLoggedIn) {
    props.history.push('/home')
  }


  const demo = (e) => {
    axios
      .post('/demo')
      .then(res => {
        props.getUserData(res.data)
        props.history.push('/home')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Header/>
      <div className="landing-main">
        <section id="main-text">
          <div id='headline'>
              <br></br>
            <h1>PLAY MORE GAMES</h1>
          </div>
          <br></br>
          <div id='summary'>
            <p>
              Roll For Fun takes the pain out of choosing what to play at your
              next game night.
            </p>
            <br></br>
            <br></br>
            <p>Create or join a party.</p>
            <p>See all of your party's games in once place.</p>
            <p>Rank your favorites.</p>
            <br></br>
            <br></br>
            <p>We'll do the rest.</p>
          </div>
        </section>
      </div>
        <p className='user-button' onClick={demo}>Demo</p>
      </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Landing);
