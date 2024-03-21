import React, { Component } from 'react'

export class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <div className='Trending'>
                <div className="card m-1">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="header-title">Trending</h4>
                        </div>

                        <div className="d-flex mt-3">
                            <i className="uil uil-arrow-growth me-2 font-18 text-primary"></i>
                            <div>
                                <a className="mt-1 font-14" href="">
                                    <strong>Golden Globes:</strong>
                                    <span className="text-muted">
                                        The 27 Best moments from the Golden Globe Awards
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            <i className="uil uil-arrow-growth me-2 font-18 text-primary"></i>
                            <div>
                                <a className="mt-1 font-14" href="">
                                    <strong>World Cricket:</strong>
                                    <span className="text-muted">
                                        India has won ICC T20 World Cup Yesterday
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            <i className="uil uil-arrow-growth me-2 font-18 text-primary"></i>
                            <div>
                                <a className="mt-1 font-14" href="">
                                    <strong>Antartica:</strong>
                                    <span className="text-muted">
                                        Metling of Totten Glacier could cause high risk to areas near by sea
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Trending;
