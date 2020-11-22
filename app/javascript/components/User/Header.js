import React from 'react';
import styled from 'styled-components';
import {emojis} from '../Seed';

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
`

const Header = (props) => {
  const {name, ip_address, device, emoji, last_seen_at, visits} = props.attributes;

  return (
    <Wrapper>
      <div>
        <h2><p>{emojis[emoji]}</p></h2>
        <div className="userName">User Name: {name}</div>
        <div className="totalViews">Visits: {visits}</div>
        <div className="UserIp">IP-address: {ip_address}</div>
        <div className="UserDevice">Device: {device}</div>
      </div>
    </Wrapper>
  )
}

export default Header;
