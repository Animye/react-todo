import React, { Component } from 'react'
import '../static/gloable.css'
import './app.css'
import Main from './Main/Main'

class App extends Component {
  render() {
    return (
      <>
        <h1>todos</h1>
        <Main />
      </>
    )
  }
}

export default App
