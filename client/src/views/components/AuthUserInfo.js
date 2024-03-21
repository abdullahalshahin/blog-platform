import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosAPI from './../../AxiosConfig';
import AvatorPng from './../../assets/images/avator.png';

export class AuthUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            profile_image: AvatorPng
        };
    }

    componentDidMount() {
        AxiosAPI.get(`/api/user-panel/dashboard/my-account`)
            .then(response => {
                const userData = response.data.result.user;

                this.setState({
                    name: userData.name,
                    email: userData.email,
                    profile_image: userData.profile_image
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { name, email, profile_image } = this.state;

        return (
            <div className='AuthUserInfo'>
                <div className="card m-1">
                    <div className="card-body">
                        <div className="dropdown float-end">
                            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>

                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to={'/user-panel/dashboard/my-account'} className="dropdown-item">Edit Profile</Link>
                            </div>
                        </div>

                        <div className="d-flex align-self-start">
                            <img className="d-flex align-self-start rounded me-2" src={profile_image} alt="Dominic Keller" height="48" />
                            <div className="w-100 overflow-hidden">
                                <h5 className="mt-1 mb-0">{name}</h5>
                                <p className="mb-1 mt-1 text-muted">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthUserInfo;
