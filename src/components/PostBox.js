import 'animate.css'
import firebase from '../firebase'
import React, { useState } from 'react';
import { Box, Flex, Button } from 'rebass';
import { Textarea, Input } from '@rebass/forms'


export const PostBox = ()=> {
  const [username, setUsername] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    await firebase
      .firestore()
      .collection('posts')
      .add({
        message: post,
        postedBy: username,
        postedAt: new Date().toUTCString()
      })
    setPost('');
    setUsername('');
  }
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      style={mainStyle}
      width='85vw'
    >
      <Box
        p={5}
        width={[1,0.8]}
        className='animate__animated animate__bounceInDown'
      >
        <form onSubmit={handleSubmit}>
          <Input
            my={3}
            id='name'
            type='text'
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
            name='userName'
            style={{borderRadius:5}}
            placeholder='My name is...'
          />
          <Textarea
            id='post'
            name='post'
            value={post}
            onChange={e => setPost(e.currentTarget.value)}
            style={{borderRadius:5}}
            placeholder='I want to say...'
          />
          <Button
            type='submit'
            color='#fbd46d'
            bg='#07031a'
            my={3}
            className="button"
            width={1}
            style={{cursor: 'pointer'}}
          >
            Post
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

const mainStyle = {
  float: 'right'
}