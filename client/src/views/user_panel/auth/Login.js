import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Helpers from './../../../utils/Helpers';
import AxiosAPI from './../../../AxiosConfig';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: localStorage.getItem('remembered_email') || '',
            password: localStorage.getItem('remembered_password') || '',
            remember_me: localStorage.getItem('remembered_email') ? true : false,
            error: ''
        };
    }

    componentDidMount() {
        let title = `Login | ${Helpers.appInfo().app_name}`;
        let meta_description = "Login Description";

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

    handleCheckboxChange = (e) => {
        this.setState({ remember_me: e.target.checked });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosAPI.post(`/api/login`, {
                email: this.state.email,
                password: this.state.password
            });

            const { token } = response.data.result;
            localStorage.setItem('AUTH_USER_TOKEN', token);

            if (this.state.remember_me) {
                localStorage.setItem('remembered_email', this.state.email);
                localStorage.setItem('remembered_password', this.state.password);
            }
            else {
                localStorage.removeItem('remembered_email');
                localStorage.removeItem('remembered_password');
            }

            window.location.href = "/user-panel/dashboard";
        } 
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                this.setState({ error: error.response.data.message });
            }
            else {
                this.setState({ error: 'An error occurred. Please try again later.' });
            }
        }
    };

    render() {
        if (localStorage.getItem('AUTH_USER_TOKEN')) {
            return <Navigate to="/user-panel/dashboard" />;
        }

        return (
            <div className='Login'>
                <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-4 col-lg-5">
                                <div className="card">
                                    <div className="card-body px-4">
                                        <div className="text-center w-75 m-auto">
                                            <h4 className="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                                            <p className="text-muted mb-2">Enter your email address and password to access admin panel.</p>
                                        </div>

                                        {this.state.error && (
                                            <div className="row mt-3">
                                                <div className="col-12 text-center">
                                                    <p className="text-danger">{this.state.error}</p>
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={this.handleSubmit}>
                                            <div className='row'>

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Mail address</label>
                                                <input className="form-control" type="email" id="email" placeholder="Enter your mail" value={this.state.email} onChange={this.handleInputChange} required />
                                            </div>

                                            <div className="mb-3">
                                                <a href="pages-recoverpw.html" className="text-muted float-end"><small>Forgot your password?</small></a>
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <div className="input-group input-group-merge">
                                                    <input type="password" id="password" className="form-control" placeholder="Enter your password" value={this.state.password} onChange={this.handleInputChange} required />
                                                    <div className="input-group-text" data-password="false">
                                                        <span className="password-eye"></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 mb-3">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkbox-signin" checked={this.state.remember_me} onChange={this.handleCheckboxChange}/>
                                                    <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="mb-3 mb-0 text-center">
                                                <button className="btn btn-primary" type="submit"> Login </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <p className="text-muted">Don't have an account? <Link to={'/user-panel/dashboard/registration'} className="text-muted ms-1"><b>Sign Up</b></Link></p>
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

export default Login;
