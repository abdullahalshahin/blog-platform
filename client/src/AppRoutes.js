import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './views/Landing';
import NotFound from './views/NotFound';
import TermsAndConditions from './views/TermsAndConditions';
import Login from './views/user_panel/auth/Login';
import Registration from './views/user_panel/auth/Registration';
import ForgetPassword from './views/user_panel/auth/ForgetPassword';
import DashboardInbox from './views/user_panel/dashboard/inbox/Index';
import PostsIndex from './views/user_panel/dashboard/posts/Index';
import PostsCreate from './views/user_panel/dashboard/posts/Create';
import PostsEdit from './views/user_panel/dashboard/posts/Edit';
import MyAccountIndex from './views/user_panel/dashboard/my_account/Index';
import MyAccountEdit from './views/user_panel/dashboard/my_account/Edit';
import PostView from './views/PostView';
import UserProfile from './views/UserProfile';

class AppRoutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null 
        };
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/posts/:post_id/show" element={<PostView />} />
                    <Route path="/user-profile/:user_id/show" element={<UserProfile />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="*" element={<NotFound />} />

                    {/* USER AUTH */}
                    <Route path="/user-panel/dashboard/login" element={<Login />} />
                    <Route path="/user-panel/dashboard/registration" element={<Registration />} />
                    <Route path="/user-panel/dashboard/forget-password" element={<ForgetPassword />} />

                    {/* Private Routes */}
                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                        (
                            <>
                                <Route path="/user-panel/dashboard" element={<DashboardInbox />} />
                                <Route path="/user-panel/dashboard/posts" element={<PostsIndex />} />
                                <Route path="/user-panel/dashboard/posts/create" element={<PostsCreate />} />
                                <Route path="/user-panel/dashboard/posts/:post_id/edit" element={<PostsEdit />} />
                                <Route path="/user-panel/dashboard/my-account" element={<MyAccountIndex />} />
                                <Route path="/user-panel/dashboard/my-account-edit" element={<MyAccountEdit />} />
                            </>
                        ) 
                        : (
                            <Route path="/user-panel/dashboard/*" element={<Navigate to="/user-panel/dashboard/login" replace />} />
                        )
                    }
                </Routes>
            </Router>
        );
    };
};

export default AppRoutes;
