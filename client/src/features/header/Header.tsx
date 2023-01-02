import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import './Header.scss';

const Header = () => (
  <>
    <Navbar sticky='top'>
      <Container className='justify-content-md-center'>
        <Navbar.Brand>
          <img
            src='/logo192.png'
            height={30}
            className='d-inline-block align-top'
            alt='Logo'
          />{' '}
          <span className='logo'>Evenemangskalendern</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
);

export default Header;
