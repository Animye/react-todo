import React, { Component } from 'react'
import './header.css'
import axios from 'axios'
class Header extends Component {
  state = {
    comment: ''
  }
  render() {
    const { comment } = this.state
    return (
      <>
        <input
          onKeyDown={this.handleEnter}
          value={comment}
          onChange={this.handleHeader}
          className='top-todo'
          placeholder='What needs to be done?'
          type='text'
          name=''
          id=''
        />
      </>
    )
  }
  handleHeader = event => {
    this.setState({
      comment: event.target.value
    })
  }
  addComment = () => {
    const { comment } = this.state
    const { addComment } = this.props
    if (comment.trim()) {
      const newComment = {
        txt: comment
      }
      axios.post('http://localhost:3008/comments', newComment).then(res => {
        addComment(res.data)
        this.setState({
          comment: '',
          completed: false
        })
      })
    } else {
      alert('请输入有效字符')
    }
  }
  handleEnter = event => {
    if (event.keyCode === 13) {
      this.addComment()
    }
  }
}

export default Header
