import "animate.css";
import React, { useState, useEffect, useCallback } from "react";
import { Text, Flex, Card } from "rebass";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Navbar, PostCard } from "../components";

export const Profile = () => {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useAuth();
  const profile = {
    displayName: currentUser.displayName,
    email: currentUser.email,
    emailVerified: currentUser.emailVerified ? "Yes" : "No",
    createdAt: new Date(currentUser.metadata.creationTime).toLocaleDateString("te-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    lastSigned: new Date(currentUser.metadata.lastSignInTime).toLocaleDateString("te-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  };

  const fetchPosts = useCallback(() =>
    db
      .collection("posts")
      .where("createdBy.name", "==", currentUser.displayName)
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      }),
    [currentUser.displayName]
  )

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const labels = {
    displayName: "Name",
    email: "Email",
    emailVerified: "Verified Account",
    createdAt: "Created On",
    lastSigned: "Last Signed In time",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width={[1]} mt={-80} height="80vh">
        <Text textAlign="center" fontSize={20} fontWeight={600} mb={15}>
          Your profile
        </Text>
        <Card
          bg="white"
          px={2}
          py={2}
          width={600}
          minHeight={250}
          style={{
            borderRadius: 8,
            boxShadow: "4px 4px 15px #ddd",
          }}
        >
          <Flex alignItems="center" justifyContent="center" height={300}>
            <table style={{ width: "80%" }}>
              {Object.keys(profile).map((key, i) => (
                <>
                  <tr style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "5px 0",
                      backgroundColor: i%2!==0? "whitesmoke": "cornsilk",
                      padding: "5px 10px",
                      borderRadius: "5px"
                    }}
                  >
                    <td>
                      <Text fontWeight={600}>{`${labels[key]}:`}</Text>
                    </td>
                    <td>
                      <Text>{profile[key]?.toString()}</Text>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </Flex>
        </Card>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width={[1]} mt={-80}>
        <Text textAlign="center" fontSize={20} fontWeight={600} mb={15}>
          Your posts
        </Text>
        {posts.map((item) => (
          <PostCard key={item.id} post={item} />
        ))}
      </Flex>
    </div>
  );
};
