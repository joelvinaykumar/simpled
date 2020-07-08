import React, { Component } from 'react';
import { Flex, Image, Box } from 'rebass';

import logo from '../assets/logo.png'

export class Sidebar extends Component {
  render() {
    return ( 
      <Flex>
        <Flex
          fontSize={['14px', '20px']}
          className='animate__animated animate__fadeInLeft'
          style={sidebarStyle}
          width={'15%'}
        >
          <Image src={logo} width='150px' />
          <Box className='sidebar-menu'>
            <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/profile'>Profile</a></li>
            </ul>
          </Box>
        </Flex>
      </Flex>
    );
  }
}


const baseCss = {
  height:'100vh',
  color: 'yellow',
  padding: '5vh 0 10vh 0',
  position:'fixed',
  flexDirection: 'column',
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