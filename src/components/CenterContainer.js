import React, { useEffect, useState } from "react";
import { Flex } from "rebass";
import { PostCard } from "./PostCard";
import { db } from "../firebase";

import { PostBox } from "./PostBox";
import { useAuth } from "../contexts/AuthContext";

export const CenterContainer = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [changeFlag, setChangeFlag] = useState(false);

  const fetchPosts = () =>
      db
        .collection("posts")
        .orderBy('postedAt', 'desc')
        .onSnapshot((snapshot) => {
          const newPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(newPosts);
        });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
    >
      <PostBox />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={1}
        mt={-80}
      >
        {posts.length? posts.map((item) => (
          <PostCard
            key={item.id}
            post={item}
            currentUser={currentUser}
            changeFlag={changeFlag}
            setChangeFlag={setChangeFlag}
          />
        )): <p>No posts</p>}
      </Flex>
    </Flex>
  );
};
