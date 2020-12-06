import 'animate.css'
import firebase from '../firebase'
import React, { useState } from 'react';
import { Text, Box, Flex, Button, Image } from 'rebass';
import { Input } from '@rebass/forms'

import logo from '../assets/logo.png'
import google from '../assets/google.png'
import { Redirect } from 'react-router-dom';

export const SignUp = ({ history })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(email==='' || password==='') {
      setError('Email/Password field empty')
    } else {
      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        if(response.refresh_token) {
          setSuccess('Account Created. You may login now.')
          window.top.location.pathname ="/login";
        }else {
          setError('User creation failed')
        }
      } catch(error) {
        setError(error.message)
      }
    }
  }

  const handleGoogleAuth = async(e) => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(googleProvider);
      if(response.credential.accessToken) {
        setSuccess('Account Created. You may login now.')
        window.top.location.pathname = "/";
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
        <Text mt={0} fontSize={14} width={350} textAlign="center">
          Signup using email password or just single-sign-on with Google
        </Text>
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
        {error.length>0 && (<Text color="red" fontSize={12} mt={20} textAlign="center">{error}</Text>)}
        {success.length>0 && (<Text color="green" fontSize={12} mt={20} textAlign="center">{success}</Text>)}
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