import React from 'react';
import styled from 'styled-components';
import {emojis} from '../Seed';

const date_in_seconds = Date.now()/1000;

const Card = styled.div`
  border: 0.8em solid #bdbdbd;
  background: #fff;
  text-align: center;
  border-radius: 50px;
  padding: 1em;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
  margin: 5em auto 5em;
  font-size: 2em;
  h2{
    p{
      text-align: center;
    }
  }
  div{
    margin-bottom: 0.4em;
  }
  a{
    color: #8eff00;
  }
`

const Header = (props) => {
  const {name, ip_address, device, emoji, last_seen_at, visits, online} = props.attributes;
  const time_in_minutes = Math.round((date_in_seconds - last_seen_at)/60);
  const status = time_in_minutes < 5 ? `Online` : `Last see ${get_time_in_words(time_in_minutes)} ago`;

  return (
    <Wrapper>
      <Card id={name}>
        <h2><p>{emojis[emoji]}</p></h2>
        <div className="userName">User Name: {name}</div>
        <div className="totalViews">Visits: {visits}</div>
        <div className="userIp">IP-address: {change_ip(ip_address)}</div>
        <div className="userDevice">Device: {device}</div>
        <div className="isOnline"><a>{status}</a></div>
      </Card>
    </Wrapper>
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

function change_ip(ip){
  return ip.split(".")
           .map((e,i) => i<1 ? e : "***")
           .join(".")
}

export default Header;
