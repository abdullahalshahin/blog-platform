import React, { Component } from 'react';
import Helpers from '../utils/Helpers';
import AxiosAPI from './../AxiosConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AvatorPng from './../assets/images/avator.png';
import { Link } from 'react-router-dom';

export class PostView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                _id: "",
                title: "",
                description: "",
                tags: [],
                status: "published",
                created_at: "",
                updated_at: "",
                total_likes: 0,
                total_dislikes: 0,
                total_comments: 0,
                latest_two_comments: [],
                user: {}
            },
            comment_input: "",
            error: null
        };
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const post_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/posts/${post_id}/show`)
            .then(response => {
                this.setState({
                    post: response.data.result.post,
                });

                let title = `${response.data.result.post.title} | ${Helpers.appInfo().app_name}`;
                let meta_description = "Description";

                Helpers.updateHeadComponentDidMount(title, meta_description);
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    GiveLike() {
        const post_id = this.state.post._id;

        AxiosAPI.put(`/api/user-panel/dashboard/posts/${post_id}/give-like`, {
            like_type: "like"
        })
        .then(response => {
            this.UpdateCurrentData(post_id)
        })
        .catch(error => {
            console.error("Error liking post:", error);
        });
    }

    handleCommentInputChange = event => {
        this.setState({ comment_input: event.target.value });
    };

    submitComment = () => {
        const { post, comment_input } = this.state;
        const post_id = post._id;

        AxiosAPI.put(`/api/user-panel/dashboard/posts/${post_id}/save-comment`, {
            text: comment_input
        })
        .then(response => {
            this.UpdateCurrentData(post_id);
            this.setState({ comment_input: "" });
        })
        .catch(error => {
            console.error("Error submitting comment:", error);
        });
    };

    UpdateCurrentData(post_id) {
        AxiosAPI.get(`/api/posts/${post_id}/show`)
            .then(response => {
                this.setState({
                    post: response.data.result.post,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { post, comment_input } = this.state;

        return (
            <div className='PostView'>
                <Navbar />
                
                <section className="py-0">
                    <div className="container">
                        <div className="card">
                            <div className="card-body pb-1">
                                <Link to={`/user-profile/${post.user.id}/show`} className="d-flex">
                                    <img className="me-2 rounded" src={(post.user.profile_image) ? post.user.profile_image : AvatorPng} alt="" height="32" />
                                    <div className="w-100">
                                        <h5 className="m-0 text-dark">{post.user.name}</h5>
                                        <p className="text-muted"><small>{post.created_at} <span className="mx-1">⚬</span> <span>Public</span></small></p>
                                    </div>
                                </Link>

                                <hr className="m-0" />

                                <div className="font-16 text-dark">
                                    <i className="mdi mdi-format-quote-open font-20"></i> {post.title}
                                </div>

                                <div>
                                    {post.description}
                                </div>

                                <hr className="m-0" />

                                <div className="my-1">
                                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                                        (
                                            <>
                                                <button className="btn btn-sm btn-link text-muted ps-0" onClick={() => this.GiveLike()}><i className="mdi mdi-heart text-danger" ></i> {post.total_likes} Likes</button>
                                            </>
                                        ) 
                                        : (
                                            <>
                                                <button className="btn btn-sm btn-link text-muted ps-0" disabled ><i className="mdi mdi-heart text-danger" ></i> {post.total_likes} Likes</button>
                                            </>
                                        )
                                    }

                                    <button className="btn btn-sm btn-link text-muted"><i className="uil uil-comments-alt"></i> {post.total_comments} Comments</button>
                                    <button className="btn btn-sm btn-link text-muted"><i className="uil uil-share-alt"></i> Share</button>
                                </div>

                                <hr className="m-0" />

                                <div className="mt-3">
                                    {post.latest_two_comments && post.latest_two_comments.map((comment, index) => (
                                        <div key={index} className="d-flex mb-2">
                                            <img className="me-2 rounded" src={(comment.user.profile_image) ? comment.user.profile_image : AvatorPng } alt="" height="32" />
                                            <div>
                                                <h5 className="m-0">{comment.user.name}</h5>
                                                <p className="text-muted mb-0"><small>{comment.created_at}</small></p>
                                                <p className="my-0">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                                    (
                                        <div className="comment-area-box">
                                            <textarea rows="2" className="form-control bg-light border-0 resize-none" value={comment_input} onChange={this.handleCommentInputChange} placeholder="Write something...." required></textarea>
                                            <div className="p-2 d-flex justify-content-between align-items-center">
                                                <div></div>
                                                <button type="button" onClick={() => this.submitComment()} className="btn btn-sm btn-success"><i className="uil uil-message me-1"></i>Post</button>
                                            </div>
                                        </div>
                                    ) 
                                    : (
                                        <></>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    };
};

export default PostView;
