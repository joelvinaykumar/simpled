import React, { Component } from 'react'

import { Sidebar } from './Sidebar'
import { CenterContainer } from './CenterContainer'
import { PostBox } from './PostBox'

export class Home extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <PostBox />
        <CenterContainer />
      </div>
    )
  }
}
