import React, { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass';
import { PostCard } from './PostCard';
import firebase from '../firebase';

import { PostBox } from './PostBox'

export const CenterContainer = ()=> {
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    const fetchPosts = () => firebase
      .firestore()
      .collection('posts')
      .onSnapshot(snapshot => {
        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(newPosts)
        setPosts(newPosts)
      })
    fetchPosts();
  }, [])

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      width='100vw'
      style={{ position: 'relative' }}
    >
      <PostBox />
      <Box width={0.5} mt={-80}>
        {posts.map(item => (
          <PostCard key={item.id} post={item} />
        ))}
      </Box>
    </Flex>
  );
}