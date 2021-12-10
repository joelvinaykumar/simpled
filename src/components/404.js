import React, { Component } from 'react'

export class NotFoundPage extends Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(#ebfffb,#f9f8eb)'
      }}>
        <img
          alt=""
          width={200}
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          className="not-found-icon"
        />
        <p className="not-found-caption" style={{
          fontSize: '30px',
          width: '80vw',
          textAlign: 'center',
          padding: '50px 0'
        }}>
          The page you're looking for is not here
        </p>
        <a
          href='/'
          style={{
            color: 'white',
            padding: '10px 30px',
            backgroundColor: '#05004e' ,
            borderRadius: '50px',
            textDecoration: 'none'
          }} 
        >
          Take Me Home
        </a>
      </div>
    )
  }
}
