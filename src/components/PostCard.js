import React, { Component } from "react";
import { Flex, Card, Text, Image, Box } from "rebass";
import { ReactTinyLink } from "react-tiny-link";

import "animate.css";
import firebase from "../firebase";
import { simplifyTime } from "../util";

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      animateDelete: false,
      iconHovered: false,
      ...this.props.post,
    };
  }

  COLLECTION_NAME = "posts";
  CURRENT_USER_NAME = this.props.currentUser.displayName;

  deletePost = async (id) => {
    try {
      this.setState({ animateDelete: true });
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(id)
        .delete();
    } catch (e) {
      console.error(e);
    }
  };
  handleLikes = async (post) => {
    if (
      post.likes.includes(this.CURRENT_USER_NAME) ||
      post.dislikes.includes(this.CURRENT_USER_NAME)
    ) {
      const newLikes = post.likes.filter((each) => each !== this.CURRENT_USER_NAME);
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          likes: newLikes,
        });
    } else {
      const newLikes = [this.CURRENT_USER_NAME, ...post.likes];
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          likes: newLikes,
        });
    }
  };

  handleDisikes = async (post) => {
    if (
      post.likes.includes(this.CURRENT_USER_NAME) ||
      post.dislikes.includes(this.CURRENT_USER_NAME)
    ) {
      const newDislikes = post.dislikes.filter(
        (each) => each !== this.CURRENT_USER_NAME
      );
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          dislikes: newDislikes,
        });
    } else {
      const newDislikes = [this.CURRENT_USER_NAME, ...post.dislikes];
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          dislikes: newDislikes,
        });
    }
  };

  sleep = (m) => new Promise((r) => setTimeout(r, m));

  handleDelete = async (id) => {
    await this.deletePost(id);
    this.props.setChangeFlag(!this.props.changeFlag);
  };
  

  render() {
    const {
      id,
      createdBy,
      message,
      postedAt,
      likes,
      dislikes,
      link,
      picture
    } = this.props.post;

    let { animateDelete } = this.state;

    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py={3}
        mt={10}
        width={[0.9, null, 0.5]}
      >
        <Card
          bg="white"
          px={4}
          py={3}
          className={
            animateDelete
              ? " animate__animated animate__fadeOutUp"
              : "animate__animated animate__fadeInUp"
          }
          style={{
            borderRadius: 8,
            boxShadow: "4px 4px 15px #ddd",
          }}
          onDoubleClick={() => this.handleLikes(this.props.post)}
          width={1}
        >
          <Flex alignItems="center">
            <Image
              src={createdBy.picture}
              width={60}
              style={{ borderRadius: "40%", marginRight: 10 }}
            />
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              width={1}
            >
              <Text fontSize={16} fontWeight={600} color="#2A2A2A" py={2}>
                {createdBy.name}
              </Text>
              <Text fontSize={12} fontStyle="italic" color="grey">
                {simplifyTime(postedAt)}
              </Text>
            </Flex>
          </Flex>
          <Box>
            <Text fontWeight={400} fontSize="16px" py={4}>
              {message}
            </Text>
            {link && (
              <Box width={1} height={160}>
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={3}
                  minLine={2}
                  url={link}
                />
              </Box>
            )}
          </Box>
          {picture && (
            <Flex justifyContent="center">
              <Image
                src={picture}
                style={{ borderRadius: "10px" }}
              />
            </Flex>
          )}
          <Flex my={3} height={30} justifyContent="space-between" alignItems="center">
            <Box
              width={40}
              height={40}
              className="action_button"
              onClick={() => this.handleDisikes(this.props.post)}
              style={{ cursor: "pointer" }}
            >
              <span role="img" aria-label="dislike" style={{ marginRight: 4 }}>
                👎
              </span>
              {dislikes.length}
            </Box>
            <Text
              fontSize={1}
              width={40}
              height={40}
              className="action_button"
              onClick={() => this.handleLikes(this.props.post)}
              style={{ cursor: "pointer" }}
            >
              <span role="img" aria-label="like">
                ❤️
              </span>
              {likes.length}
            </Text>
            {(createdBy.name === this.CURRENT_USER_NAME) && (
              <Text
                fontSize={1}
                width={40}
                height={40}
                className="action_button"
                onClick={() => this.handleDelete(id)}
                style={{ cursor: "pointer" }}
              >
                <span role="img" aria-label="delete">
                  🗑️
                </span>
              </Text>
            )}
          </Flex>
        </Card>
      </Flex>
    );
  }
}
