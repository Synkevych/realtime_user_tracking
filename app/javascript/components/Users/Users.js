import React, {useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import User from './User';
import styled from 'styled-components';

const date_now =  Math.round( Date.now()/1000);

const Home = styled.div`
  text-line: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  `

  const Header = styled.div`
  padding: 1em 2em 0.1em 1em;
  h1 {
    font-size: 42px;
  }
  `
  const Subheader = styled.div`
  text-align: center;
  h3{
    font-weight: 300;
    font-size: 26px;
  }
  `
  const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  grid-auto-rows: auto;
`

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // get all of our users from API
    // update users in our state 
    axios.get('/api/v1/users.json')
    .then(response => {
      setUsers(response.data.data)
    })
    .catch(response => console.log(response))
  }, [users.length])
  const online_user_counter = users.reduce(
        (acc, a) => {
          if (date_now - a.attributes.last_seen_at < 5*60 ){
            return acc +1;
          } else {
            return acc;
          }
        }, 0 );

  const grid = users.map( item => {
    return (<User key={item.id} attributes={item} />)
  })

  return (
    <Home>
      <Header>
        <Subheader><h3>Online User Counter</h3>
        <div>Now on our site <b>online {online_user_counter}</b> visitors</div>
        </Subheader>
      </Header>
      <Grid>
        {grid}
      </Grid>
    </Home>
  )
}

export default Users;
