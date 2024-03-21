import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Edit extends Component {
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
                profile_image: "",
            },
            errors: {}
        };
    }

    componentDidMount() {
        let title = `My Account Edit | ${Helpers.appInfo().app_name}`;
        let meta_description = "My Account Edit Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/user-panel/dashboard/my-account`)
            .then(response => {
                const userData = response.data.result;

                this.setState({
                    user: userData.user
                });
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user } = this.state;

        AxiosAPI.put(`/api/user-panel/dashboard/my-account-update`, {
                name: user.name,
                gender: user.gender,
                date_of_birth: user.date_of_birth,
                password: user.password,
                address: user.address,
                about_me: user.about_me
            })
            .then(response => {
                window.location.href = '/user-panel/dashboard/my-account';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({ errors: error.response.data.errors || {} });
                }
                else {
                    console.error("Error creating user:", error);
                }
            });
    }

    render() {
        const { user, errors } = this.state;

        return (
            <div className='Edit'>
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
                                                    <li className="breadcrumb-item"><Link to={'/user-panel/dashboard/my-account'}> My Account </Link></li>
                                                    <li className="breadcrumb-item active"> My Account Edit </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> My Account Edit </h4>
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
                                                        <div className="mb-2 col-md-6">
                                                            <label htmlFor="name"> Name <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                                                        </div>

                                                        <div className="mb-2 col-md-3">
                                                            <label htmlFor="gender">Gender <span className="text-danger">*</span></label>
                                                            <select className="form-select" id="gender" name="gender" value={user.gender} onChange={this.handleInputChange} required >
                                                                <option value="" disabled>Choose Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="others">Others</option>
                                                            </select>
                                                        </div>

                                                        <div className="mb-2 col-md-3">
                                                            <label htmlFor="date_of_birth"> Date Of Birth <span className="text-danger">*</span></label>
                                                            <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={user.date_of_birth} onChange={this.handleInputChange} placeholder="" required />
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-4">
                                                            <label htmlFor="phone_number"> Phone Number <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="phone_number" name="phone_number" value={user.phone_number} onChange={this.handleInputChange} placeholder="017XXXXXXXX" required />
                                                        </div>

                                                        <div className="mb-2 col-md-4">
                                                            <label htmlFor="email"> Mail <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={this.handleInputChange} placeholder="e.g: example@f-mail.com" required />
                                                        </div>

                                                        <div className="mb-2 col-md-4">
                                                            <label htmlFor="password"> Password <span className="text-danger">*</span></label>
                                                            <div className="input-group input-group-merge">
                                                                <input type="password" id="password" className="form-control" placeholder="Enter your password" value={user.password} onChange={this.handleInputChange} />
                                                                <div className="input-group-text" data-password="false">
                                                                    <span className="password-eye"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-12">
                                                            <label htmlFor="address"> Address </label>
                                                            <textarea className="form-control" id="address" name="address" rows="3" value={user.address} onChange={this.handleInputChange}></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-12">
                                                            <label htmlFor="about_me"> About Me </label>
                                                            <textarea className="form-control" id="about_me" name="about_me" rows="3" value={user.about_me} onChange={this.handleInputChange}></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="float-end">
                                                        <Link to={'/user-panel/dashboard/my-account'} className="btn btn-primary button-last"> Go Back </Link>
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

export default Edit;
