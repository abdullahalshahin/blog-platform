import React, { Component } from 'react';
import Helpers from '../utils/Helpers';
import AxiosAPI from './../AxiosConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Trending from './components/Trending';
import Post from './components/Post';
import AuthUserInfo from './components/AuthUserInfo';

export class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            pagination: {}
        };
    }

    componentDidMount() {
        let title = `Home | ${Helpers.appInfo().app_name}`;
        let meta_description = "Home Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/index`)
            .then(response => {
                this.setState({
                    posts: response.data.result.posts,
                    pagination: response.data.result.pagination,
                });
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
    
    render() {
        const { posts } = this.state;

        return (
            <div className='Landing'>
                <Navbar />
                
                <section className="py-1">
                    <div className="container">
                        <div className="card">
                            <div className="row">
                                <div className="col-xxl-3 col-lg-6 order-lg-1 order-xxl-1">
                                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                                        (
                                            <>
                                                <AuthUserInfo />
                                            </>
                                        ) 
                                        : (
                                            <>
                                            </>
                                        )
                                    }

                                    <Trending />
                                </div>

                                <div className="col-xxl-6 col-lg-12 order-lg-2 order-xxl-1">
                                    {posts.map(post => (
                                        <Post key={post._id} post={post} />
                                    ))}

                                    <div className="text-center mb-3">
                                        <p className="text-danger"><i className="mdi mdi-spin mdi-loading me-1 font-16"></i> Load more </p>
                                    </div>
                                </div>

                                <div className="col-xxl-3 col-lg-6 order-lg-1 order-xxl-2">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    };
};

export default Landing;
