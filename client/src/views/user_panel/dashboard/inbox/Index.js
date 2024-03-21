import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total_posts: 0,
            total_draft_posts: 0,
            total_published_posts: 0
        };
    }

    componentDidMount() {
        let title = `Dashboard | ${Helpers.appInfo().app_name}`;
        let meta_description = "Dashboard Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/user-panel/dashboard`)
            .then(response => {
                const userData = response.data.result;

                this.setState({
                    total_posts: userData.total_posts,
                    total_draft_posts: userData.total_draft_posts,
                    total_published_posts: userData.total_published_posts
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
        const {total_posts, total_draft_posts, total_published_posts } = this.state;

        return (
            <div className="wrapper">
                <Topbar />

                <LeftSidebar />

                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <h4 className="page-title"> Dashboard </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card widget-flat">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-account-multiple widget-icon"></i>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0" title="Number of Total Posts"> Total Posts </h5>
                                            <h3 className="mt-3 mb-3"> {total_posts} </h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 7.00%</span>
                                                <span className="text-nowrap">Since last month</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card widget-flat">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-cart-plus widget-icon"></i>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0" title="Number of Total Published"> Total Published </h5>
                                            <h3 className="mt-3 mb-3"> {total_published_posts} </h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                                <span className="text-nowrap">Since last month</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card widget-flat">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-pulse widget-icon"></i>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0" title="Number of Total Draft"> Total Draft </h5>
                                            <h3 className="mt-3 mb-3"> {total_draft_posts} </h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
                                                <span className="text-nowrap">Since last month</span>  
                                            </p>
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
