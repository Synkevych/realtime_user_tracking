import React, {useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from './Header';

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
