import React, { Component } from 'react'

export class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }
    
    render() {
        return (
            <div className='NotFound'>
                NotFound
            </div>
        );
    };
};

export default NotFound;
