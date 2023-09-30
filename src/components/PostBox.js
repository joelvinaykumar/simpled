import 'animate.css'
import React, { useState } from 'react';
import { Box, Flex, Button, Text } from 'rebass';
import { Textarea, Input } from '@rebass/forms';

import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext';

export const PostBox = ()=> {
  const [post, setPost] = useState('');
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [pic, setPic] = useState(null);

  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    try {
      let fileRef, pictureUrl= "";
      if(post.length === 0){
        return setError('Cannot post empty toot')
      }
      if(pic) {
        let storageRef = storage.ref();
        fileRef = storageRef.child(pic.name)
        await fileRef.put(pic)
        pictureUrl = await fileRef.getDownloadURL();
      }
      await db
        .collection('posts')
        .add({
          message: post,
          createdBy: {
            name: currentUser.displayName,
            picture: currentUser.photoURL 
          },
          link,
          picture: pictureUrl,
          likes: [],
          dislikes: [],
          postedAt: new Date().toUTCString()
        })
    } catch (error) {
      setError(error.message)
    }
  }

  const handlePicUpload = e => setPic(e.target.files[0]);
  console.log(pic)
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
          type="url"
          value={link}
          placeholder="Attach your link here"
          mt={2}
          style={{borderRadius:5}}
          onChange={e => setLink(e.target.value)}
        />
        {pic? <img src={pic} alt="uploaded media" />: null}
        <label
          htmlFor="pic"
          style={{
            width: "100%",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "#07031a",
            color: "#fbd46d",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
            marginTop: 15
          }}
        >
          <span role="img" aria-label="camera" >Upload a picture instead 📷</span>
        </label>
        <input
          type="file"
          accept="image/*"
          id="pic"
          onChange={e => handlePicUpload(e)}
          style={{ display: "none" }}
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
        {error.length>0 
          ? <Text color="red" textAlign="center" mt={10} >{error}</Text>
          : <Text fontStyle="italic" fontWeight={600} textAlign="center">
            Honey tip <span role="img" aria-label="honey">🍯</span>: Just tapp tapp at center of a post to like
          </Text>
        }
      </Box>
    </Flex>
  )
}