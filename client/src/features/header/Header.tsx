import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import './Header.scss';

const Header = () => (
  <Navbar className='header' sticky='top'>
    <Container className='justify-content-md-center'>
      <Navbar.Brand className='brand'>
        <img
          src='/logo192.png'
          height={30}
          className='icon'
          alt='Logo'
        />{' '}
        <span className='logo'>Evenemangskalendern</span>
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
