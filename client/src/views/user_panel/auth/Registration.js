import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Helpers from './../../../utils/Helpers';
import AxiosAPI from './../../../AxiosConfig';

export class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: '',
            date_of_birth: '',
            phone_number: '',
            email: '',
            password: '',
            address: '',
            error_message: '',
            errors: null
        };
    }

    componentDidMount() {
        let title = `Registration | ${Helpers.appInfo().app_name}`;
        let meta_description = "Registration Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        await AxiosAPI.post(`/api/registration`, {
            name: this.state.name || "",
            gender: this.state.gender || "",
            date_of_birth: this.state.date_of_birth || "",
            phone_number: this.state.phone_number || "",
            email: this.state.email || "",
            password: this.state.password || "",
            address: this.state.address || ""
        })
        .then(response => {
            // const { token } = response.data.result;
            // localStorage.setItem('AUTH_USER_TOKEN', token);

            window.location.href = "/user-panel/dashboard/login";
        })
        .catch(error => {
            if (error.response && error.response.data) {
                this.setState({ error_message: error.response.data.message });
                this.setState({ errors: error.response.data.errors });
            }
            else {
                this.setState({ error: 'An error occurred. Please try again later.' });
            }
        });
    }

    render() {
        if (localStorage.getItem('AUTH_USER_TOKEN')) {
            return <Navigate to="/user-panel/dashboard" />;
        }

        return (
            <div className='Registration'>
                <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-8 col-lg-8">
                            <div className="card">
                                    <div className="card-body px-4">
                                        <div className="text-center w-75 m-auto">
                                            <h4 className="text-dark-50 text-center pb-0 fw-bold">Sign Up</h4>
                                            <p className="text-muted mb-2">Don't have an account? Create your account, it takes less than a minute</p>
                                        </div>

                                        {this.state.error_message && (
                                            <div className="row mt-3">
                                                <div className="col-12 text-center">
                                                    <h4 className="text-danger">{this.state.error_message}</h4>
                                                </div>
                                            </div>
                                        )}

                                        {this.state.errors && (
                                            <div>
                                                <ul>
                                                    {this.state.errors.map((error, index) => (
                                                        <li className="text-danger" key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row g-2">
                                                <div className="mb-2 col-md-6">
                                                    <label htmlFor="name"> Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                                                </div>

                                                <div className="mb-2 col-md-3">
                                                    <label htmlFor="gender">Gender <span className="text-danger">*</span></label>
                                                    <select className="form-select" id="gender" name="gender" value={this.state.gender} onChange={this.handleInputChange} required >
                                                        <option value="" disabled>Choose Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="others">Others</option>
                                                    </select>
                                                </div>

                                                <div className="mb-2 col-md-3">
                                                    <label htmlFor="date_of_birth"> Date Of Birth <span className="text-danger">*</span></label>
                                                    <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleInputChange} placeholder="" required />
                                                </div>
                                            </div>

                                            <div className="row g-2">
                                                <div className="mb-2 col-md-4">
                                                    <label htmlFor="phone_number"> Phone Number <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="phone_number" name="phone_number" value={this.state.phone_number} onChange={this.handleInputChange} placeholder="017XXXXXXXX" required />
                                                </div>

                                                <div className="mb-2 col-md-4">
                                                    <label htmlFor="email"> Mail <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="e.g: example@f-mail.com" required />
                                                </div>

                                                <div className="mb-2 col-md-4">
                                                    <label htmlFor="password"> Password <span className="text-danger">*</span></label>
                                                    <div className="input-group input-group-merge">
                                                        <input type="password" id="password" className="form-control" placeholder="Enter your password" value={this.state.password} onChange={this.handleInputChange} />
                                                        <div className="input-group-text" data-password="false">
                                                            <span className="password-eye"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-2">
                                                <div className="mb-2 col-md-12">
                                                    <label htmlFor="address"> Address </label>
                                                    <textarea className="form-control" id="address" name="address" rows="3" value={this.state.address} onChange={this.handleInputChange}></textarea>
                                                </div>
                                            </div>

                                            <div className="mb-3 mb-0 text-center">
                                                <button className="btn btn-primary" type="submit"> Log In </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <p className="text-muted">Don't have an account? <Link to={'/user-panel/dashboard/login'} className="text-muted ms-1"><b>Sign In</b></Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Registration;
