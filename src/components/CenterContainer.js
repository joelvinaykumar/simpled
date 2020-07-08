import React, { useEffect, useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { PostCard } from './PostCard';
import firebase from '../firebase';

const usePosts = ()=> {
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    const unsubscribe = firebase
      .firestore()
      .collection('posts')
      .onSnapshot(snapshot =>{
        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setPosts(newPosts)
      })
      return ()=> unsubscribe;

  }, [])

  return posts;
}

export const CenterContainer = ()=> {
  const posts = usePosts();
    return (
      <Flex
        justifyContent='center'
        style={mainStyle}
        width='85vw'
      >
        <Box width={[0.7,0.4]}>
          {posts.map(item => (
            <PostCard key={item.id} post={item} />
          ))}
        </Box>
      </Flex>
    );
}

const mainStyle = {
  float: 'right'
}