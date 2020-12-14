import React, { Component } from "react";
import { Flex, Card, Text, Image, Box } from "rebass";
import { ReactTinyLink } from "react-tiny-link";

import "animate.css";
import firebase from "../firebase";
import { simplifyTime } from "../util";
import { useAuth } from "../contexts/AuthContext";

let currentUserEmail = "";

const InterimComponent = () => {
  const { currentUser } = useAuth();
  currentUserEmail = currentUser.email;
  return <></>;
};

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
  CURRENT_USER_EMAIL = currentUserEmail;

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
      post.likes.includes(post.createdBy) ||
      post.dislikes.includes(post.createdBy)
    ) {
      const newLikes = post.likes.filter((each) => each !== post.createdBy);
      await firebase
        .firestore()
        .collection(this.COLLECTION_NAME)
        .doc(post.id)
        .set({
          ...post,
          likes: newLikes,
        });
    } else {
      const newLikes = [post.createdBy, ...post.likes];
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
      post.likes.includes(post.createdBy) ||
      post.dislikes.includes(post.createdBy)
    ) {
      const newDislikes = post.dislikes.filter(
        (each) => each !== post.createdBy
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
      const newDislikes = [post.createdBy, ...post.dislikes];
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
    this.setState({ animateDelete: true });
    await this.sleep(500);
    this.deletePost(id);
  };

  render() {
    const {
      createdBy,
      message,
      postedAt,
      likes,
      dislikes,
      picture,
    } = this.props.post;

    let { animateDelete } = this.state;
    const isLink = message.match(
      new RegExp(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi
      )
    );

    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py={3}
        mt={10}
        width={[0.9, null, 0.5]}
      >
        <InterimComponent />
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
              src={picture}
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
                {createdBy}
              </Text>
              <Text fontSize={12} fontStyle="italic" color="grey">
                {simplifyTime(postedAt)}
              </Text>
            </Flex>
          </Flex>
          <Box>
            <Text fontWeight={400} fontSize="16px" py={4}>
              {!isLink && message}
            </Text>
            {isLink && (
              <Box width={1} height={160}>
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={3}
                  minLine={2}
                  url={message}
                />
              </Box>
            )}
          </Box>
          <Flex my={3} height={30} justifyContent="space-between">
            <Box
              width={40}
              height={40}
              className="action_button"
              onClick={() => this.handleDisikes(this.props.post)}
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
            >
              <span role="img" aria-label="like">
                ❤️
              </span>
              {likes.length}
            </Text>
            {createdBy === this.CURRENT_USER_EMAIL && (
              <Image
                src="https://image.flaticon.com/icons/svg/60/60761.svg"
                width={15}
                height={15}
                className="action-button"
                onClick={(id) => this.handleDelete(id)}
              />
            )}
          </Flex>
        </Card>
      </Flex>
    );
  }
}
