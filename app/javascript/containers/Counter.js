import React from 'react';
import styled from 'styled-components';

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
const Counter = (props) =>{
  return (
    <Header>
      <Subheader><h3>Online User Counter</h3>
        <div>Now on our site online <b id="user_counter">{props.attributes}</b> visitors</div>
      </Subheader>
    </Header>
  )
}

export default Counter;
