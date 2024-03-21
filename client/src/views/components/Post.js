import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AvatorPng from './../../assets/images/avator.png';

export class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        const { post } = this.props;

        return (
            <div className="card">
                <div className="card-body pb-1">
                    <Link to={`/user-profile/${post.user.id}/show`} className="d-flex">
                        <img className="me-2 rounded" src={post.user.profile_image} alt="" height="32" />
                        <div className="w-100">
                            <h5 className="m-0">{post.user.name}</h5>
                            <p className="text-muted"><small>{post.created_at} <span className="mx-1">⚬</span> <span>Public</span></small></p>
                        </div>
                    </Link>

                    <hr className="m-0" />

                    <Link to={`/posts/${post._id}/show`}>
                        <div className="font-16 text-center text-dark my-3">
                            <i className="mdi mdi-format-quote-open font-20"></i> {post.title}
                        </div>
                    </Link>

                    <hr className="m-0" />

                    <div className="my-1">
                        <button className="btn btn-sm btn-link text-muted ps-0" disabled><i className="mdi mdi-heart text-danger"></i> {post.total_likes} Likes</button>
                        <button className="btn btn-sm btn-link text-muted" disabled><i className="uil uil-comments-alt"></i> {post.total_comments} Comments</button>
                        <button className="btn btn-sm btn-link text-muted"><i className="uil uil-share-alt"></i> Share</button>
                    </div>

                    <hr className="m-0" />

                    <div className="mt-3">
                        {post.latest_two_comments.slice(0, 2).map((comment, index) => (
                            <div key={index} className="d-flex mb-2">
                                <img className="me-2 rounded" src={(comment.user.profile_image) ? comment.user.profile_image : AvatorPng } alt="" height="32" />
                                <div>
                                    <h5 className="m-0">{comment.user.name}</h5>
                                    <p className="text-muted mb-0"><small>{comment.created_at}</small></p>
                                    <p className="my-0">{comment.text}</p>
                                </div>
                            </div>
                        ))}

                        <hr />
                    </div>
                </div>
            </div>
        );
    };
};

export default Post;
