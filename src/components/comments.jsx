'use strict';
import React from 'react';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

class Comment extends React.Component{
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
        <div className="commentForm">
            <form action="#">
                Comment: <input type="text" name="fcomment"/>
                <ButtonInput type="submit" bsStyle="danger" value="Submit"/>
            </form>
       </div>
    )
  }
}

class CommentList extends React.Component{
    render() {
    var commentNodes = this.props.data.map(function(comment) {
        return (
        <Comment author={comment.author} key={comment.id}>
            {comment.text}
        </Comment>
        );
    });
    return (
        <div className="commentList">
        {commentNodes}
        </div>
    );
    }
}

export default class CommentBox extends React.Component{
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
}
