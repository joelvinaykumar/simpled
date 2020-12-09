import "animate.css";
import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Card } from "rebass";
import { Input } from "@rebass/forms";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Navbar, PostCard } from "../components";

export const Profile = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  const { currentUser, updateProfile } = useAuth();
  const profile = {
    displayName: currentUser.displayName,
    email: currentUser.email,
    emailVerified: currentUser.emailVerified,
    createdAt: currentUser.metadata.creationTime,
    lastSigned: currentUser.metadata.lastSignInTime,
  };

  useEffect(() => {
    const fetchPosts = () =>
      db
        .collection("posts")
        .where("createdBy", "==", currentUser.email)
        .onSnapshot((snapshot) => {
          const newPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(newPosts);
          setPosts(newPosts);
        });
    fetchPosts();
  }, [currentUser.email, profile]);

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  const labels = {
    displayName: "Name",
    email: "Email",
    emailVerified: "Verified Account",
    createdAt: "Created On",
    lastSigned: "Last Signed In time",
  };

  const handleSubmit = async (name, picture) => {
    try {
      await updateProfile(name, picture);
      setSuccess("Profile updated");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setSuccess("You can edit detials now");
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
      <Flex justifyContent="space-around" alignItems="center" height="80vh">
        <Card
          bg="white"
          px={4}
          py={2}
          width={400}
          minHeight={300}
          style={{
            borderRadius: 8,
            boxShadow: "4px 4px 15px #ddd",
          }}
        >
          <Flex justifyContent="center" alignItems="center" height={300}>
            <table>
              {Object.keys(user).map((key) => (
                <>
                  <tr>
                    <td>
                      <Text fontWeight={600}>{`${labels[key]}:`}</Text>
                    </td>
                    <td>
                      <Text>{user[key]?.toString()}</Text>
                    </td>
                  </tr>
                  <div style={{ height: 20 }} />
                </>
              ))}
            </table>
          </Flex>
        </Card>
        <Flex
          flexDirection="column"
          alignItems="center"
          width={350}
          height={400}
        >
          <Text
            mt={10}
            fontSize={18}
            width={350}
            fontWeight={600}
            textAlign="center"
          >
            Profile
          </Text>
          <Input
            my={3}
            id="name"
            type="text"
            value={name}
            disabled={!edit}
            onChange={(e) => setName(e.currentTarget.value)}
            name="name"
            style={{ borderRadius: 5 }}
            placeholder="John Doe"
          />
          <Input
            my={3}
            id="picture"
            type="text"
            value={picture}
            required
            disabled={!edit}
            onChange={(e) => setPicture(e.currentTarget.value)}
            name="password"
            style={{ borderRadius: 5 }}
            placeholder="https://miro.medium.com/max/790/1*reXbWdk_3cew69RuAUbVzg.png"
          />
          <Button
            color="#fbd46d"
            bg="#07031a"
            my={3}
            width={1}
            disabled={edit}
            style={{ cursor: "pointer" }}
            onClick={handleEdit}
          >
            Edit Details
          </Button>
          <Button
            type="submit"
            color="#fbd46d"
            bg="#07031a"
            my={3}
            width={1}
            disabled={!edit}
            style={{ cursor: "pointer" }}
            onClick={handleSubmit}
          >
            Update
          </Button>
          {error.length > 0 && (
            <Text color="red" fontSize={12} mt={20} textAlign="center">
              {error}
            </Text>
          )}
          {success.length > 0 && (
            <Text color="green" fontSize={12} mt={20} textAlign="center">
              {success}
            </Text>
          )}
        </Flex>
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
