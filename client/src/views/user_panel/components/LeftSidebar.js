import React, { Component } from 'react';
import AvatorPng from './../../../assets/images/avator.png';
import LogoDarkSmPng from './../../../assets/images/logo-dark-sm.png';
import LogoDarkPng from './../../../assets/images/logo-dark.png';
import LogoSmPng from './../../../assets/images/logo-sm.png';
import LogoPng from './../../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export class LeftSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <div className='leftside-menu'>
                <Link to={'/'} className="logo logo-light">
                    <span className="logo-lg">
                        <img src={LogoPng} alt="logo" />
                    </span>
                    <span className="logo-sm">
                        <img src={LogoSmPng} alt="small logo" />
                    </span>
                </Link>

                <Link to={'/'} className="logo logo-dark">
                    <span className="logo-lg">
                        <img src={LogoDarkPng} alt="dark logo" />
                    </span>
                    <span className="logo-sm">
                        <img src={LogoDarkSmPng} alt="small logo" />
                    </span>
                </Link>

                <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                    <i className="ri-checkbox-blank-circle-line align-middle"></i>
                </div>

                <div className="button-close-fullsidebar">
                    <i className="ri-close-fill align-middle"></i>
                </div>

                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    <div className="leftbar-user">
                        <Link to={'/user-panel/dashboard/my-account'}>
                            <img src={AvatorPng} alt="" height="42" className="rounded-circle shadow-sm" />
                            <span className="leftbar-user-name mt-2">Dominic Keller</span>
                        </Link>
                    </div>

                    <ul className="side-nav">
                        <li className="side-nav-title">Navigation</li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" className="side-nav-link">
                                <i className="uil-home-alt"></i>
                                <span className="badge bg-success float-end">2</span>
                                <span> Dashboards </span>
                            </a>

                            <div className="collapse" id="sidebarDashboards">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <Link to={'/user-panel/dashboard'}> Analysis </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/posts'} className="side-nav-link">
                                <i className="ri-article-line"></i>
                                <span> Posts </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/my-account'} className="side-nav-link">
                                <i className="uil-user-square"></i>
                                <span> My Account </span>
                            </Link>
                        </li>
                    </ul>

                    <div className="clearfix"></div>
                </div>
            </div>
        );
    };
};

export default LeftSidebar;
