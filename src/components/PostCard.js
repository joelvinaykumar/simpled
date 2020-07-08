import React, { Component } from 'react'
import { Flex, Card, Text, Image, Box } from 'rebass';

import 'animate.css'
import firebase from '../firebase'

export class PostCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animateDelete: false
    }
  }

  deletePost(id) {
    this.setState({ animateDelete:true })
    firebase
      .firestore()
      .collection('posts')
      .doc(id)
      .delete()
  }

  render() {
    const {
      id, 
      postedBy='', 
      message='', 
      postedAt
    } = this.props.post;

    const sleep = m=> new Promise(r => setTimeout(r, m));

    let { animateDelete } = this.state;
    
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        py={3}
      >
        <Card
          bg='white'
          px={4}
          py={3}
          className={animateDelete? 
                    ' animate__animated animate__fadeOutDown': 
                    'animate__animated animate__fadeInDown'}
          style={{
            borderRadius: 8,
            boxShadow: '4px 4px 15px #ddd'
          }}
          width={1}
        >
          <Flex
            alignItems='center'
          >
            <Flex
              flexDirection='column'
              justifyContent='space-between'
              width={1}
            >
              <Text fontSize='16px' fontWeight={800} py={2}>
                {postedBy}
              </Text>
              <Text fontSize='12px'>
                {postedAt? postedAt : ''}
              </Text>
            </Flex>
            <Image 
              src='https://image.flaticon.com/icons/svg/60/60761.svg'
              width={15}
              onClick={async()=> {this.setState({animateDelete:true});await sleep(500);this.deletePost(id)}}
            />
          </Flex>
          <Box>
            <Text fontWeight={400} fontSize='16px' py={4}>
              {message}
            </Text>
          </Box>
          <Flex
            my={3}
            justifyContent='space-between'
          >
            <Text fontSize={1}><span role='img' aria-label='views'>👁️</span> {Math.ceil(Math.random()*10)}</Text>
            <Text fontSize={1}><span role='img' aria-label='reshare'>🔁</span> {Math.ceil(Math.random()*10)}</Text>
            <Text fontSize={1}><span role='img' aria-label='comment'>💬</span> {Math.ceil(Math.random()*10)}</Text>
            <Text fontSize={1}><span role='img' aria-label='likes'>❤️</span> {Math.ceil(Math.random()*10)}</Text>
          </Flex>
        </Card>
      </Flex>
    )
  }
}
