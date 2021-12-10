import 'animate.css'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Text, Flex, Button, Image, Box } from 'rebass';

import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.png'
import google from '../assets/google.png'

export const Login = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { loginWIthGoogle } = useAuth();
  const history = useHistory();

  const handleGoogleAuth = async () => {
    try {
      await loginWIthGoogle();
      setSuccess('Login successful');
      history.push('/')
    }catch(error) {
      setError(error.message);
    };
  }

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height="100vh"
    >
      <Box 
        width={0.7}
        height="100%"
        backgroundColor="red"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80')",
          backgroundSize: "cover"
        }}
      />
      <Flex
        flexDirection='column'
        alignItems='center'
        width={0.3}
        height={400}
      >
        <Image style={{borderRadius: 20}} src={logo} width={100} backgroundColor="black" />
        <b>
          <Text mt={30} fontSize={18} textAlign="center">
            Simpled is simplified "simplified"
          </Text>
        </b>
        <Text mt={20} fontSize={14} width={350} textAlign="center">
          Share your thoughts quickly in 100 words or simply a link. Just like twitter.
        </Text>
        <Button
          type='submit'
          color='#fbd46d'
          bg='#07031a'
          mt={50}
          width={0.6}
          style={GoogleButtonStyle}
          onClick={handleGoogleAuth}
        >
          Log in With Google |
          <Image src={google} width={15} />
        </Button>
        <Box
          width={0.8}
        >
          <Text color="red" fontSize={12} mt={20}>{error}</Text>
          <Text color="green" fontSize={12} mt={20}>{success}</Text>
        </Box>
      </Flex>
    </Flex>
  )

}
const GoogleButtonStyle = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
};