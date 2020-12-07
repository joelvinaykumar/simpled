import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Flex, Image } from "rebass";
import { useAuth } from "../contexts/AuthContext";
import { auth } from '../firebase';

import logo from "../assets/logo.png";

export const Navbar = () => {

  const default_pic = "https://miro.medium.com/max/790/1*reXbWdk_3cew69RuAUbVzg.png";

  const [profilePicture, setProfilePicture] = useState(default_pic);

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    setProfilePicture(auth.currentUser.photoURL || default_pic);
  },[currentUser]);

  const handleLogout = async () => {
    alert("Logging you out...");
    await logout();
    history.push("/login");
  };

  return (
    <Flex>
      <Flex
        fontSize={["14px", "20px"]}
        className="animate__animated animate__bounceInDown"
        style={navBarStyle}
      >
        <Link to="/" ><Image src={logo} width="150px" /></Link>
        <Flex alignItems='center' justifyContent='space-evenly' width={300}>
          <Link style={menuStyle} to="/">Home</Link>
          <Link style={menuStyle} to="/not-found">404</Link>
          <Link style={menuStyle} to="/login" onClick={handleLogout}>Logout</Link>
          <Link style={menuStyle} to="/profile">
            <Image
              src={profilePicture}
              ml={10}
              width={40}
              height={40}
              style={{ borderRadius: "50%", cursor: "pointer" }}
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

const navBarStyle = {
  height: "100px",
  color: "yellow",
  position: "-webkit-sticky",
  position: "sticky",
  top: "100px",
  width: "100%",
  padding: "0 60px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#07031a",
  textDecoration: 'none'
};

const menuStyle = { textDecoration: 'none', color: 'yellow' }