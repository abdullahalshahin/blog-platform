import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                _id: "",
                title: "",
                description: "",
                tags: [],
                status: "",
            },
            errors: {}
        };
    }

    componentDidMount() {
        let title = `Post Edit | ${Helpers.appInfo().app_name}`;
        let meta_description = "Post Edit Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const post_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/user-panel/dashboard/posts/${post_id}/edit`)
            .then(response => {
                const userData = response.data.result;

                this.setState({
                    post: userData.post
                });
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            post: {
                ...prevState.post,
                [name]: value
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { post } = this.state;
        AxiosAPI.put(`/api/user-panel/dashboard/posts/${post._id}/update`, {
                title: post.title,
                description: post.description,
                tags: post.tags,
                status: post.status
            })
            .then(response => {
                window.location.href = '/user-panel/dashboard/posts';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({ errors: error.response.data.errors || {} });
                }
                else {
                    console.error("Error creating post:", error);
                }
            });
    }
    
    render() {
        const { post, errors } = this.state;

        return (
            <div className='Create'>
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
                                                    <li className="breadcrumb-item"><Link to={'/user-panel/dashboard/posts'}> Posts </Link></li>
                                                    <li className="breadcrumb-item active"> Post Edit </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> Post Edit </h4>
                                        </div>
                                    </div>
                                </div>

                                {Object.keys(errors).length > 0 && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="alert alert-danger" role="alert">
                                                <ul>
                                                    {Object.values(errors).map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-12">
                                                            <label htmlFor="title"> Title <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={this.handleInputChange} required />
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-12">
                                                            <label htmlFor="description"> Description <span className="text-danger">*</span></label>
                                                            <textarea className="form-control" id="description" name="description" rows="5" value={post.description} onChange={this.handleInputChange}></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-6">
                                                            <label htmlFor="input_status"> Status <span className="text-danger">*</span></label>
                                                            <select className="form-select" id="input_status" name="status" value={post.status} onChange={this.handleInputChange} required>
                                                                <option value="" disabled> Choose Status </option>
                                                                <option value="draft"> Draft </option>
                                                                <option value="published"> Published </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="float-end">
                                                        <Link to={'/user-panel/dashboard/posts'} className="btn btn-primary button-last"> Go Back </Link>
                                                        <button type="submit" className="btn btn-success button-last"> Save </button>
                                                    </div>
                                                </form>
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

export default Create;
