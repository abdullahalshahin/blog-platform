import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            {new Date().getFullYear()} © Blog Platform
                        </div>

                        <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-md-block">
                                <Link to={'/'}>About</Link>
                                <Link to={'/'}>Support</Link>
                                <Link to={'/'}>Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
};

export default Footer;
