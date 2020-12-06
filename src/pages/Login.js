import 'animate.css'
import firebase from '../firebase'
import React, { useState } from 'react';
import { Text, Box, Flex, Button, Image } from 'rebass';
import { Input } from '@rebass/forms'

import logo from '../assets/logo.png'
import google from '../assets/google.png'
import { Redirect } from 'react-router-dom';

export const Login = ()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const TOKEN_KEY = 'simpled_token';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email==='' || password==='') {
      setError('Email/Password field empty')
    } else {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return <Redirect to="/" />
      }catch(error) {
        setError(error.message);
      }
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      if(response) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.setItem(TOKEN_KEY, response.credential.accessToken);
        window.top.location.pathname = "/";
      }else {
        setError('Failed o login with Google')
      }
    }catch(error) {
      setError(error.message)
    }
  }
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height="80vh"
    >
      <Flex
        flexDirection='column'
        alignItems='center'
        width={350}
        height={400}
      >
        <Image style={{borderRadius: 20}} src={logo} width={100} backgroundColor="black" />
        <b><Text mt={30} fontSize={16} textAlign="center">
          Simpled is nothing but a short form of simplified
        </Text></b>
        <Text mt={20} fontSize={14} width={350} textAlign="center">
          Login using email password or just single-sign-on with Google
        </Text>
        {error.length>0 && (<Text color="red" fontSize={12} mt={20}>{error}</Text>)}
        <Input
          my={3}
          id='email'
          type='text'
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          name='email'
          style={{borderRadius:5}}
          placeholder='john.doe@example.com'
        />
        <Input
          my={3}
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          name='password'
          style={{borderRadius:5}}
        />
        <Button
          type='submit'
          color='#fbd46d'
          bg='#07031a'
          my={3}
          width={1}
          style={{cursor: 'pointer'}}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Button
          type='submit'
          color='#fbd46d'
          bg='#07031a'
          my={3}
          width={1}
          style={GoogleButtonStyle}
          onClick={handleGoogleAuth}
        >
          Sign in With Google |
          <Image src={google} width={15} />
        </Button>
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