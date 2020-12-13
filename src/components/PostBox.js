import 'animate.css'
import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from 'rebass';
import { Input, Textarea } from '@rebass/forms';

import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext';

export const PostBox = ()=> {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { currentUser } = useAuth();

  console.log(photo)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(photo !== null) {
      const uploadTask = storage.ref(`images/${photo.name}`).put(photo);
      uploadTask.on(
        "state_changesd", 
        snapshot => {}, 
        err => console.log(err),
        () => {
          storage.ref('images').child(photo.name).getDownloadURL().then(url => setImageUrl(url))
        }
      )
    }

    await db
      .collection('posts')
      .add({
        message: post,
        createdBy: currentUser.email,
        picture: currentUser.photoURL,
        likes: [],
        dislikes: [],
        imageUrl: imageUrl,
        postedAt: new Date().toUTCString()
      })
    setPost('');
  }

  const handleUpload = async (e) => {

    if(e.target.files[0]) {
      e.preventDefault();
      setPhoto(e.target.files[0])
    }
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
          <Input 
            type="file" 
            accept=".png,.jpeg,.jpg" 
            value={photo} 
            onChange={handleUpload} 
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