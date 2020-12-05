import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {emojis} from '../Seed';
import { func } from 'prop-types';

const date_in_seconds = Date.now()/1000;

const Card = styled.div`
border-radius: 1em;
border: 0.3em solid ${props => props.color};
background: #fff;
text-align: center;
`
const UserLogo = styled.div`
text-align: center;
font-size: xx-large;
border-radius: 100%;
border: 1px solid #efefef;
margin: 0.4em 2.7em;
background: radial-gradient(#ffffff, #d6d6d6);

@media (max-width: 320px)  {
    margin: 0.5em 12em;
  };
@media (max-width: 800px) {
    margin: 0.4em 5.5em;
  };
@media (min-width: 1280px)  {
    margin: 0.4em 2.7em;
  };
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

  const status = online ? `Online` : `Last see ${get_time_in_words(time_in_minutes, last_seen_at)} ago`;
  const link_border =  online ? "#8eff00" : "#efefef";
  const card_class =  online ? 'active' : '';
  return (
    <Card color={link_border} id={name} className={card_class}>
      <UserLogo><p>{emojis[emoji]}</p></UserLogo>
      <UserTextItem>User: <b>{name}</b></UserTextItem>
      <UserTextItem>Visits: <b>{visits}</b></UserTextItem>
      <UserTextItem>IP: <b>{change_ip(ip_address)}</b></UserTextItem>
      <UserTextItem>Devise: <b>{device}</b></UserTextItem>
      <UserStatus color={link_border}>
        <Link to={`/users/${props.attributes.id}`}>{status}</Link>
      </UserStatus>
    </Card>
  )
}

function get_time_in_words(time, last_seen_at){
  if (time == 0)
    return  Math.round(date_in_seconds - last_seen_at) + " sec";
  else if (time < 60)
    return time + " min"
  else if (time < 60 * 24)
    return Math.round(time / 60) + " h";
  else if (time < (60 * 24 * 7))
    return Math.round(time / (60 * 24) ) + " d";
  else {
    return "long time";
  }
}

function change_ip(string){
  return string.split(".")
           .map((e,i) => i<3 ? e : e.replace(/[0-9]/g,"*"))
           .join(".")
}

export default User;
