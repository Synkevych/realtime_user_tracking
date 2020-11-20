import React, {useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';

const Home = styled.div`
  text-line: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  `

 const Subheader = styled.div`
  text-align: center;
  font-weight: 300;
  font-size: 26px;
  `
  const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`

const User = (props) => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    const url = `/api/v1/users/${id}`;
    
    axios.get(url)
    .then( response => {
      setUser(response.data);
    })
    .then(() => {
      setLoaded(true);
    })
    .catch(response => console.log(response))
  }, [])
  
  console.log("user", user);

  return (
    <div className="wrapper">
    <div className="column">
    {
      loaded && <Header attributes = {user.data.attributes}/>
    }
    </div>
    </div>
  )
}

export default User;
