import 'animate.css'
import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from 'rebass';
import { Textarea } from '@rebass/forms';

import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext';

export const PostBox = ()=> {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await db
      .collection('posts')
      .add({
        message: post,
        createdBy: currentUser.email,
        picture: currentUser.photoURL,
        likes: [],
        dislikes: [],
        postedAt: new Date().toUTCString()
      })
    setPost('');
  }

  useEffect(() =>{
    if(post===''){
      setError('Cannot post empty toot')
    }
  }, [post])
  
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      width={[1, 0.6]}
      my={40}
    >
      <Box
        p={5}
        width={1}
        className='animate__animated animate__bounceInDown'
      >
          <Textarea
            id='post'
            name='post'
            value={post}
            onChange={e => setPost(e.currentTarget.value)}
            style={{borderRadius:5}}
            placeholder='I want to say...'
          />
          <Button
            onClick={handleSubmit}
            color='#fbd46d'
            bg='#07031a'
            my={3}
            width={1}
            style={{cursor: 'pointer'}}
          >
            Toot
          </Button>
          <Text fontStyle="italic" fontWeight={600} textAlign="center">
            Honey tip <span role="img" aria-label="honey">🍯</span>: Just tapp tapp at center of a post to like
          </Text>
      </Box>
      {error.length>0 && alert(error)}
    </Flex>
  )
}