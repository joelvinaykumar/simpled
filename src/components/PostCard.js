import React, { Component } from 'react'
import { Flex, Card, Text, Image, Box } from 'rebass';

import 'animate.css'
import firebase from '../firebase'

export class PostCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animateDelete: false,
      error: '',
      ...this.props.post,
      likes: 0
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

  handleLikes = async (post) => {
    await firebase
      .firestore()
      .collection('posts')
      .doc(post.id)
      .set({...post, likes: post.likes+1})
  }

  handleDisikes = async (post) => {
    await firebase
      .firestore()
      .collection('posts')
      .doc(post.id)
      .set({...post, dislikes: post.dislikes+1})
  }

  render() {
    const {
      id, 
      createdBy, 
      message, 
      postedAt,
      likes,
      dislikes
    } = this.props.post;

    const sleep = m=> new Promise(r => setTimeout(r, m));

    let { animateDelete } = this.state;
    
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        py={3}
        mt={10}
        width={0.5}
      >
        <Card
          bg='white'
          px={4}
          py={3}
          className={animateDelete? 
                    ' animate__animated animate__fadeOutUp': 
                    'animate__animated animate__fadeInUp'}
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
              <Text fontSize={16} fontWeight={600} color="#2A2A2A" py={2}>
                {createdBy}
              </Text>
              <Text fontSize={12} fontStyle="italic" color="grey">
                {postedAt}
              </Text>
            </Flex>
          </Flex>
          <Box onDoubleClick={() => this.handleLikes(this.props.post)}>
            <Text fontWeight={400} fontSize='16px' py={4}>
              {message}
            </Text>
          </Box>
          <Flex
            my={3}
            justifyContent='space-between'
          >
            <Text fontSize={1} onClick={() => this.handleDisikes(this.props.post)}>
              <span  role="img" style={{...iconStyle, marginRight: 4}}>👎</span>
              {dislikes}
            </Text>
            <Text fontSize={1} onClick={() => this.handleLikes(this.props.post)}>
              <span  role="img" style={iconStyle}>❤️</span>
              {likes}
            </Text>
            <Image 
              src='https://image.flaticon.com/icons/svg/60/60761.svg'
              width={15}
              style={iconStyle}
              onClick={async()=> {this.setState({animateDelete:true});await sleep(500);this.deletePost(id)}}
            />
          </Flex>
        </Card>
      </Flex>
    )
  }
}

const iconStyle = {cursor: 'pointer'}