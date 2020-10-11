import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
  return(
    <Navbar dark={true} color='dark'>
      <NavbarBrand tag="h2" className="text-warning">Hacker News</NavbarBrand>
    </Navbar>
  );
};

export default Header;
