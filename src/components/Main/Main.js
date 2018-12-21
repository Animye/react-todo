import React, { Component } from 'react'
import Header from '../Header/Header'
import Section from '../Section/Section'
import Footer from '../Footer/Footer'
import './main.css'
import axios from 'axios'
class Main extends Component {
  state = {
    comments: [],
    type: 'all'
    // ,
    // isgoing: false
  }
  componentDidMount() {
    axios.get('http://localhost:3008/comments').then(res => {
      this.setState({
        comments: res.data
      })
    })
  }
  render() {
    const { comments, type } = this.state
    // const num = comments.length
    const content = comments.length ? (
      <>
        <Section
          // isgoing={isgoing}
          type={type}
          comments={comments}
          del={this.del}
          completeComments={this.completeComments}
        />
        <Footer
          comments={comments}
          changeType={this.changeType}
          type={type}
          del={this.del}
        />
      </>
    ) : (
      <div />
    )
    return (
      <div className='main'>
        <Header addComment={this.addComment} />
        {content}
      </div>
    )
  }
  addComment = newComment => {
    const { comments } = this.state
    this.setState({
      comments: [...comments, newComment]
    })
  }
  del = id => {
    const { comments } = this.state
    this.setState({
      comments: comments.filter(comment => comment.id !== id)
    })
  }
  completeComments = id => {
    const { comments } = this.state
    // if (comments.findIndex(comment => comment.id) !== -1) {  }
    axios
      .patch(`http://localhost:3008/comments/${id}`, {
        completed: !comments.find(a => a.id === id).completed
      })
      .then(res => {
        this.setState({
          comments: comments.map(comment => {
            if (comment.id === id) {
              return res.data
            }
            return comment
          })
        })
      })
  }
  changeType = type => {
    // const { type } = this.state
    this.setState({
      type: type
    })
  }
}

export default Main
