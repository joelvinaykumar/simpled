import React, { Component } from 'react';
import { Flex, Image, Box } from 'rebass';

import logo from '../assets/logo.png'

export class Navbar extends Component {
  render() {
    return ( 
      <Flex>
        <Flex
          fontSize={['14px', '20px']}
          className='animate__animated animate__bounceInDown'
          style={sidebarStyle}
          width={'15%'}
        >
          <Image src={logo} width='150px' />
          <Box className='sidebar-menu' style={menuStyle}>
              <a href='/'>Home</a>
              <a href='/profile'>404</a>
          </Box>
        </Flex>
      </Flex>
    );
  }
}


const baseCss = {
  height:'100px',
  width: '100vw',
  color: 'yellow',
  padding: '0 60px',
  position:'fixed',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor:'#07031a',
}
const sidebarStyle = {
  ...baseCss,
}

const suggestionStyle = {
  ...baseCss,
}

const menuStyle = {
  display: 'flex',
  flexDirection: 'row'
}