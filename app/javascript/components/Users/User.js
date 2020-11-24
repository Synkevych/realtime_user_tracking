import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {emojis} from '../Seed';

const date_in_seconds = Date.now()/1000;

const Card = styled.div`
border: 1px solid ${props => props.color};
background: #fff;
text-align: center;
`
const UserLogo = styled.div`
text-align: center;
font-size: xx-large;
border-radius: 100%;
border: 1px solid #efefef;
margin: 0.4em 2.7em;
`
const UserTextItem = styled.div`
padding: 0.5em 0;
b {
  font-size: 1.2em;
}
`
const UserStatus = styled.div`
padding: 0.5em;
margin: 0 2.5em 1em;
border-radius: 5em;
background:  ${props => props.color};
a {
  color: #000;
  font-size: 1.2em;
  text-decoration: none;
}
`
const User = (props) =>{
  const {name, ip_address, device, emoji, last_seen_at, visits, online} = props.attributes.attributes;
  const time_in_minutes = Math.round((date_in_seconds - last_seen_at)/60);

  const status = online ? `Online` : `Last see ${get_time_in_words(time_in_minutes)} ago`;
  const link_border =  online ? "#8eff00" : "#efefef";
  return (
    <Card color={link_border} id={name}>
      <UserLogo><p>{emojis[emoji]}</p></UserLogo>
      <UserTextItem>User: <b>{name}</b></UserTextItem>
      <UserTextItem>Visits: <b>{visits}</b></UserTextItem>
      <UserTextItem>IP: <b>{ip_address}</b></UserTextItem>
      <UserTextItem>Devise: <b>{device}</b></UserTextItem>
      <UserStatus color={link_border}>
        <Link to={`/users/${props.attributes.id}`}>{status}</Link>
      </UserStatus>
    </Card>
  )
}

function get_time_in_words(time){
  if (time < 60)
    return time + " min"
  else if (time < 60 * 24)
    return Math.round(time / 60) + " h";
  else if (time < (60 * 24 * 7))
    return Math.round(time / (60 * 24) ) + " d";
  else {
    return "long time";
  }
}

export default User;
