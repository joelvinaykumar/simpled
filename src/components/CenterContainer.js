import React, { useEffect, useState } from "react";
import { Flex } from "rebass";
import { PostCard } from "./PostCard";
import { db } from "../firebase";

import { PostBox } from "./PostBox";

export const CenterContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () =>
      db
        .collection("posts")
        .onSnapshot((snapshot) => {
          const newPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(newPosts);
        });
    fetchPosts();
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <PostBox />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={1}
        mt={-80}
      >
        {posts.map((item) => (
          <PostCard key={item.id} post={item} />
        ))}
      </Flex>
    </Flex>
  );
};
