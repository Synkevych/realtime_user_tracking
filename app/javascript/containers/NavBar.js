import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Counter from './Counter';

const Header = styled.nav`
	text-align: center;
	background-color: #e6ecf0;
	border-radius: 50px;
  padding: 0.2em;
  a {
    background-color: #4CAF50;
    color: #000;
    font-size: 1.2em;
    text-decoration: none;
    text-align: center;
    border-radius: 50px;
}
`

const NavBar = () => (
  <header>
    <Header>
      <Link to='/' className='navbar-brand'>
        <h3 className='navbar-brand logo-text'>Home</h3>
      </Link>
    </Header>
    <Counter attributes={0}/>
  </header>
);

export default NavBar;
