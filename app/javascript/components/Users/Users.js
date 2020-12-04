import React, {useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';
import styled from 'styled-components';
import Counter from '../../containers/Counter';

const Home = styled.div`
  text-line: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  `
  const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;

  @media (max-width: 520px) {
    grid-template-columns: auto;
  };
  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  };
  @media (min-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
  };
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  };
`

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/users.json')
    .then(response => {
      setUsers(response.data.data)
    })
    .catch(response => console.log(response))
  }, [users.length])
  
  const online_user_counter = users.reduce(
        (acc, a) => {
          if ( a.attributes.online ){
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
      <Counter attributes={online_user_counter}/>
      <Grid className="cards-grid">
        {grid}
      </Grid>
    </Home>
  )
}

export default Users;
