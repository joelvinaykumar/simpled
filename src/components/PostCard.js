import React, { Component } from 'react'
import { Flex, Card, Text, Image, Box } from 'rebass';
import { ReactTinyLink } from 'react-tiny-link';
import { useAuth } from '../contexts/AuthContext'

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

  COLLECTION_NAME = 'posts';

  deletePost(id) {
    this.setState({ animateDelete:true })
    firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .delete()
  }

  handleLikes = async (post) => {
    if(post.likes.includes(post.createdBy)) {
      const newLikes = post.likes.filter(each => each!==post.createdBy);
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          likes: newLikes
        })
    } else {
      const newLikes = [post.createdBy, ...post.likes];
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          likes: newLikes
        })
    }
  }

  handleDisikes = async (post) => {
    if(post.dislikes.includes(post.createdBy)) {
      const newDislikes = post.dislikes.filter(each => each!==post.createdBy);
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          dislikes: newDislikes
        })
    } else {
      const newDislikes = [post.createdBy, ...post.dislikes];
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          dislikes: newDislikes
        })
    }
  }
  
  sleep = m=> new Promise(r => setTimeout(r, m));

  handleDelete = async (id)=> {
    this.setState({animateDelete:true});
    await this.sleep(500);
    this.deletePost(id)
  }

  render() {
    const {
      id, 
      createdBy, 
      message, 
      postedAt,
      likes,
      dislikes,
      picture
    } = this.props.post;

    let { animateDelete } = this.state;
    const isLink = message.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ig);
    
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        py={3}
        mt={10}
        width={[0.9, null, 0.5]}
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
            <Image src={picture} width={60} style={{borderRadius: '40%', marginRight: 10}} />
            <Flex
              flexDirection='column'
              justifyContent='space-between'
              alignItems='flex-start'
              width={1}
            >
              <Text fontSize={16} fontWeight={600} color="#2A2A2A" py={2}>
                {createdBy}
              </Text>
              <Text fontSize={12} fontStyle="italic" color="grey">
                {new Date(postedAt).toUTCString()}
              </Text>
            </Flex>
          </Flex>
          <Box onDoubleClick={() => this.handleLikes(this.props.post)}>
            <Text fontWeight={400} fontSize='16px' py={4}>
              {!isLink && message}
            </Text>
            {isLink && (
              <Box width={1} height={160}>
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={1}
                  url={message}
                />
              </Box>
            )}
          </Box>
          <Flex
            my={3}
            justifyContent='space-between'
          >
            <Text fontSize={1} onClick={() => this.handleDisikes(this.props.post)}>
              <span  role="img" aria-label="dislike" style={{...iconStyle, marginRight: 4}}>👎</span>
              {dislikes.length}
            </Text>
            <Text fontSize={1} onClick={() => this.handleLikes(this.props.post)}>
              <span  role="img" aria-label="like" style={iconStyle}>❤️</span>
              {likes.length}
            </Text>
            {true && <Image 
              src='https://image.flaticon.com/icons/svg/60/60761.svg'
              width={15}
              style={iconStyle}
              onClick={(id) => this.handleDelete(id)}
            />}
          </Flex>
        </Card>
      </Flex>
    )
  }
}

const iconStyle = {cursor: 'pointer'}