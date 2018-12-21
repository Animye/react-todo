import React, { Component } from 'react'
import axios from 'axios'
import './section.css'
class Section extends Component {
  render() {
    const { comments, completeComments, type } = this.props
    // const { isgoing } = this.state
    // const showComments = comments.filter(comment =>
    //   type === 'all'
    //     ? true
    //     : type === 'active'
    //     ? !comment.completed
    //     : comment.completed
    // )
    const showComments = comments.filter(comment => {
      if (type === 'all') {
        return true
      } else if (type === 'active') {
        return !comment.completed
      } else {
        return comment.completed
      }
    })
    const view = (
      <ul className='list'>
        {[...showComments].reverse().map(comment => (
          <li
            className={comment.id}
            key={comment.id}
            style={{
              textDecoration: comment.completed ? 'line-through' : 'none'
            }}
          >
            {/* <input
              onChange={this.handleName}
              name='isgoing'
              type='checkbox'
              id={comment.id}
              // checked={comment.completed}
              // onClick={() => {
              //   this.dian(false)
              // }}
            /> */}
            <span
              onClick={() => {
                completeComments(comment.id)
              }}
            >
              {comment.txt}
            </span>

            <button
              onClick={() => {
                this.del(comment.id)
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )

    return <>{view}</>
  }

  del = id => {
    const { del } = this.props
    axios.delete(`http://localhost:3008/comments/${id}`).then(res => {
      del(id)
    })
  }
  // dian = () => {
  //   this.setState({
  //     isgoing: !this.state.isgoing
  //   })
  // }
  // handleName = event => {
  //   const target = event.target
  //   const name = target.name
  //   this.setState({
  //     [name]: target.checked
  //   })
  // }
  // changeHide = event => {
  //   var eleClassName = event.target.id
  //   var name1 = event.target.className
  //   if (eleClassName === name1) {
  //     this.setState({
  //       isgoing: true
  //     })
  //   } else {
  //     this.setState({
  //       isgoing: false
  //     })
  //   }
  // }
}

export default Section
