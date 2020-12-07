import 'animate.css'
import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from 'rebass';
import { Textarea } from '@rebass/forms'

import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext';

export const PostBox = ()=> {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();

    await db
      .collection('posts')
      .add({
        message: post,
        createdBy: currentUser.email,
        likes: 0,
        dislikes: 0,
        postedAt: new Date().toUTCString()
      })
    setPost('');
  }

  useEffect(() =>{
    if(post===''){
      setError('Cannot post empty toot')
    }
  }, [])
  
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      style={mainStyle}
      width='100vw'
      my={40}
    >
      <Box
        p={5}
        width={0.6}
        className='animate__animated animate__bounceInDown'
      >
        <form onSubmit={handleSubmit}>
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
            Toot
          </Button>
          <Text fontStyle="italic" fontWeight={600} textAlign="center">Honey tip🍯: Just tapp tapp a post to like</Text>
        </form>
      </Box>
      {error.length>0 && alert(error)}
    </Flex>
  )
}

const mainStyle = {

}