import React, { useEffect, useState } from "react";
import Header from "../../UI/Header";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from '../../UI/UserHeader'

const Parties = (props) => {
  const { user_id } = props;

  const [parties, setParties] = useState([]);

console.log(parties)

  useEffect(() => {
    axios.get("/parties", user_id).then((res) => setParties(res.data));
  }, [user_id]);

  const partiesMapped = parties.map((party) => {
    return <Link key={party.party_name}><h3>{party.party_name}</h3></Link>;
            
  });

  return (
    <div>
      {props.isLoggedIn ? <UserHeader/> :<Header/>}
      <nav>
        <h1>YOUR PARTIES</h1>

        <Link to="/parties/create">
          <li>CREATE</li>
        </Link>
        <Link to="/parties/join">
          <li>JOIN</li>
        </Link>
        {partiesMapped}
      </nav>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Parties);
