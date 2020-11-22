import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
	margin-top: 2vh;
	text-align: center;
	background-color: #e6ecf0;
	border-radius: 50px;
  display: grid;
  grid-gap: 0.3em;
  padding: 1em;
  align-items: end;
`
const Footer = () => (
	<FooterStyle>
		<div>
			Coded and built with{' '}
			<span role='img' aria-label='heart'>
				❤️
			</span>{' '}
			by{' '}
			<a
				href='https://www.linkedin.com/in/synkevych'
				target='_blank'
				rel='noopener noreferrer'
			>
				Synkevych{' '}
			</a>
    </div>
    <div></div>
    <div>
		Source code available on{' '}
		<a
			href='https://github.com/Synkevych/realtime_user_tracking'
			target='_blank'
			rel='noopener noreferrer'
		>
			GitHub
		</a>
		</div>
	</FooterStyle>
);

export default Footer;
