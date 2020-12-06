import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

import { Navbar, CenterContainer } from '../components'
import { SignUp } from './SignUp';

export const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log(' I come here')
    const token = localStorage.getItem('simpled_token');
    console.log(token)
    if(token.length>0){
      console.log(token)
      setAuthenticated(true)
    }

    if(!authenticated) {
      return <Redirect to="/login" />
    }

  }, []);

  console.log(authenticated)

  return (
    <div>
      <Navbar />
      <CenterContainer />
    </div>
  )

}
