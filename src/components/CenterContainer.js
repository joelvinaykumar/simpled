import React, { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass';
import { PostCard } from './PostCard';
import firebase from '../firebase';

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

  console.log('ksuhjdbf', posts);

  return (
    <Flex
      justifyContent='center'
      style={mainStyle}
      width='85vw'
    >
      <Box width={[0.7,0.6]}>
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