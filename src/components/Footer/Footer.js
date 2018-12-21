import React, { Component } from 'react'
import './footer.css'
import axios from 'axios'
class Footer extends Component {
  render() {
    const { comments, changeType, type } = this.props
    const num = comments.filter(comment => !comment.completed).length
    return (
      <>
        <ul className='last'>
          <span>
            {num}
            {num === 1 ? 'item' : 'items'} left
          </span>
          <li
            onClick={() => {
              changeType('all')
            }}
            style={{
              border: type === 'all' ? '1px solid #ccc' : '1px solid #fff'
            }}
          >
            All
          </li>
          <li
            onClick={() => {
              changeType('active')
            }}
            style={{
              border: type === 'active' ? '1px solid #ccc' : '1px solid #fff'
            }}
          >
            Active
          </li>
          <li
            onClick={() => {
              changeType('completed')
            }}
            style={{
              border: type === 'completed' ? '1px solid #ccc' : '1px solid #fff'
            }}
          >
            Completed
          </li>
          {comments.findIndex(comment => comment.completed) !== -1 ? (
            <span onClick={this.clear}>Clear completed</span>
          ) : null}
        </ul>
      </>
    )
  }
  clear = () => {
    const { del, comments } = this.props
    comments
      .filter(comment => comment.completed)
      .forEach(ele => {
        axios.delete(`http://localhost:3008/comments/${ele.id}`).then(res => {
          del(ele.id)
        })
      })
  }
}

export default Footer
