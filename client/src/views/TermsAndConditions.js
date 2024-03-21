import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export class TermsAndConditions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }
    
    render() {
        return (
            <div className='TermsAndConditions'>
                <Navbar />

                <section className="py-1">
                    <div className="container">
                        <div className="card">
                            <div className="row">
                                <div className="col-12">
                                    <p className='m-2'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
                                        PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    };
};

export default TermsAndConditions;
