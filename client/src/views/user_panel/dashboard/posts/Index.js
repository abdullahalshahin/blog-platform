import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            posts: []
        };
    }

    componentDidMount() {
        let title = `Posts | ${Helpers.appInfo().app_name}`;
        let meta_description = "Posts Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchPosts();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchPosts() {
        AxiosAPI.get(`/api/user-panel/dashboard/posts`)
            .then(response => {
                const userData = response.data.result;

                this.setState({
                    posts: userData.posts
                });
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }

    deletePost(post_id) {
        AxiosAPI.delete(`/api/user-panel/dashboard/posts/${post_id}/delete`)
            .then(response => {
                this.fetchPosts();
            })
            .catch(error => {
                console.error("Error deleting post:", error);
            });
    }

    render() {
        return (
            <div className='Index'>
                <div className="wrapper">
                    <Topbar />

                    <LeftSidebar />

                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><Link to={'/'}> Blog Platform </Link></li>
                                                    <li className="breadcrumb-item"><Link to={'/user-panel/dashboard'}> Dashboard </Link></li>
                                                    <li className="breadcrumb-item active"> Posts </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> Post List </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row mb-2">
                                                    <div className="col-sm-5">
                                                        <Link to={'/user-panel/dashboard/posts/create'} className="btn btn-danger mb-2"><i className="mdi mdi-plus-circle me-2"></i> Add Post </Link>
                                                    </div>
                                                </div>

                                                <div className="table-responsive">
                                                    <table id="basic-datatable" className="table table-centered table-striped dt-responsive nowrap w-100">
                                                        <thead>
                                                            <tr>
                                                                <th> SL </th>
                                                                <th> Title </th>
                                                                <th style={{ width: '75px' }}> Status </th>
                                                                <th style={{ width: '75px' }}> Action </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {this.state.posts.map((post, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{post.title}</td>
                                                                    <td>{post.status}</td>
                                                                    <td>
                                                                        <Link to={`/posts/${post._id}/show`} className="action-icon"> <i className="mdi mdi-eye"></i></Link>
                                                                        <Link to={`/user-panel/dashboard/posts/${post._id}/edit`} className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
                                                                        <button type="button" className="btn action-icon" onClick={() => this.deletePost(post._id)} title='Delete'><i className="mdi mdi-delete"></i></button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    };
};

export default Index;
