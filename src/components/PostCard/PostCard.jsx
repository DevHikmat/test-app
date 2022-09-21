import React from 'react'
import { Link } from 'react-router-dom';
import "./PostCard.scss";

const PostCard = ({ post }) => {
  return (
    <div className='col-3 py-2'>
        <Link to={`/cabinet/${post._id}`}>
        <div className="card h-100">
            <img height="220px" src={post.image.url} alt="img" className="card-img-top" />
            <div className="card-body">
                <div className="box d-flex justify-content-between">
                    <div className="like">
                        <i className="fa-regular fa-heart me-2 text-danger"></i>
                        <span>{post.like.length} likes</span>
                    </div>
                    <div className="comment">
                        <i className="fa-regular fa-comment me-2 text-primary"></i>
                        <span>{post.comments.length} comments</span>
                    </div>
                </div>
                <h6 className="card-title">{post.title}</h6>
                <p id='content'>{post.content}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default PostCard