import React, { Component } from 'react';
import AxiosAPI from './../../../AxiosConfig';
import AvatorPng from './../../../assets/images/avator.png';
import LogoDarkSmPng from './../../../assets/images/logo-dark-sm.png';
import LogoDarkPng from './../../../assets/images/logo-dark.png';
import LogoSmPng from './../../../assets/images/logo-sm.png';
import LogoPng from './../../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export class Topbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
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

    handleLogout = () => {
        localStorage.removeItem('AUTH_USER_TOKEN');

        window.location.href = '/';
    };

    render() {
        const { name, email, profile_image } = this.state;

        return (
            <div className='navbar-custom'>
                <div className="topbar container-fluid">
                    <div className="d-flex align-items-center gap-lg-2 gap-1">
                        <div className="logo-topbar">
                            <Link to={'/user-panel/dashboard'} className="logo-light">
                                <span className="logo-lg">
                                    <img src={LogoPng} alt="logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src={LogoSmPng} alt="small logo" />
                                </span>
                            </Link>

                            <Link to={'/user-panel/dashboard'} className="logo-dark">
                                <span className="logo-lg">
                                    <img src={LogoDarkPng} alt="dark logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src={LogoDarkSmPng} alt="small logo" />
                                </span>
                            </Link>
                        </div>

                        <button className="button-toggle-menu">
                            <i className="mdi mdi-menu"></i>
                        </button>

                        <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>

                    <ul className="topbar-menu d-flex align-items-center gap-3">
                        <li className="dropdown d-lg-none">
                            <Link className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" to={"#"} role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="ri-search-line font-22"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                <form className="p-3">
                                    <input type="search" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                </form>
                            </div>
                        </li>

                        <li className="dropdown">
                            <Link className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" to={"#"} role="button" aria-haspopup="false" aria-expanded="false">
                                <span className="account-user-avatar">
                                    <img src={profile_image} alt="" width="32" className="rounded-circle" />
                                </span>

                                <span className="d-lg-flex flex-column gap-1 d-none">
                                    <h5 className="my-0">{name}</h5>
                                    <h6 className="my-0 fw-normal">{email}</h6>
                                </span>
                            </Link>
                            
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome !</h6>
                                </div>

                                <Link to={'/user-panel/dashboard/my-account'} className="dropdown-item">
                                    <i className="mdi mdi-account-circle me-1"></i>
                                    <span>My Account</span>
                                </Link>

                                <button className="dropdown-item" onClick={this.handleLogout}>
                                    <i className="mdi mdi-logout me-1"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
};

export default Topbar;
