import React, { Component } from 'react';
import Helpers from '../utils/Helpers';
import AxiosAPI from './../AxiosConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Post from './components/Post';
import AvatorPng from './../assets/images/avator.png';
import { Link } from 'react-router-dom';

export class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: "",
                name: "",
                gender: "",
                date_of_birth: "",
                phone_number: "",
                email: "",
                address: "",
                about_me: "",
                profile_image: AvatorPng,
                posts: []
            },
            posts: [],
            error: null
        };
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const user_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/user-profile/${user_id}`)
            .then(response => {
                this.setState({
                    user: response.data.result.user,
                });

                let title = `${response.data.result.user.name} | ${Helpers.appInfo().app_name}`;
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

    render() {
        const { user } = this.state;

        return (
            <div className='UserProfile'>
                <Navbar />
                
                <section className="py-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <img src={user.profile_image} className="rounded-circle avatar-lg img-thumbnail" alt="" />

                                        <h4 className="mb-0 mt-2">{user.name}</h4>
                                        <p className="text-muted font-14">{user.gender}</p>

                                        <div className="text-start mt-3">
                                            <h4 className="font-13 text-uppercase">About Me :</h4>
                                            <p className="text-muted font-13 mb-3">{user.about_me}</p>
                                            <p className="text-muted mb-2 font-13"><strong>Full Name :</strong> <span className="ms-2">{user.name}</span></p>
                                            <p className="text-muted mb-2 font-13"><strong>Mobile :</strong><span className="ms-2">{user.phone_number}</span></p>
                                            <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ms-2 ">{user.email}</span></p>
                                            <p className="text-muted mb-1 font-13"><strong>Location :</strong> <span className="ms-2">{user.address}</span></p>
                                        </div>

                                        <ul className="social-list list-inline mt-3 mb-0">
                                            <li className="list-inline-item">
                                                <Link to={'/'} className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={'/'} className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={'/'} className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={'/'} className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8 col-lg-7">
                                <div className="card">
                                    <div className="card-body">
                                    {user.posts.map(post => (
                                        <Post key={post._id} post={post} />
                                    ))}
                                    </div>
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

export default UserProfile;
