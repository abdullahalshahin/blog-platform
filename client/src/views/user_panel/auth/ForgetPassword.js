import React, { Component } from 'react';
import Helpers from './../../../utils/Helpers';

export class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Forget Password | ${Helpers.appInfo().app_name}`;
        let meta_description = "Forget Password Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        return (
            <div className='ForgetPassword'>
                ForgetPassword Page
            </div>
        );
    };
};

export default ForgetPassword;
