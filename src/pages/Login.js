import 'animate.css'
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Text, Flex, Button, Image } from 'rebass';
import { Input } from '@rebass/forms'

import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.png'
import google from '../assets/google.png'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, loginWIthGoogle } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email==='' || password==='') {
      setError('Email/Password field empty')
    } else {
      try {
        await login(email, password);
        setSuccess('Login successful');
        history.push('/')
      }catch(error) {
        setError(error.message);
      };
    }
  }

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
      height="80vh"
    >
      <Flex
        flexDirection='column'
        alignItems='center'
        width={350}
        height={400}
      >
        <Image style={{borderRadius: 20}} src={logo} width={100} backgroundColor="black" />
        <b>
          <Text mt={30} fontSize={18} textAlign="center">
            Simpled is simplified "simplified"
          </Text>
          <Text mt={20} fontSize={14} width={350} textAlign="center">
            Share your thoughts quickly in 100 words or simply a link. Just like twitter.
          </Text>
        </b>
        <Text mt={20} fontSize={14} width={350} textAlign="center">
          Don't have an account? SignUp <Link to="/signup">here</Link>
        </Text>
        <Text mt={10} fontSize={18} width={350} fontWeight={600} textAlign="center">
          Log In
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
          placeholder="********"
          style={{borderRadius:5}}
        />
        <Button
          type='submit'
          color='#fbd46d'
          bg='#07031a'
          my={3}
          width={1}
          height={["100px", "150px"]}
          style={{cursor: 'pointer'}}
          onClick={handleSubmit}
        >
          Log In
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
          Log in With Google |
          <Image src={google} width={15} />
        </Button>
        <Text color="red" fontSize={12} mt={20}>{error}</Text>
        <Text color="green" fontSize={12} mt={20}>{success}</Text>
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