import React from 'react';
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaRegUser, FaUsersLine } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import AllUsers from './admin/AllUsers';
import Payments from './admin/Payments.jsx';
import { PiArticleLight } from "react-icons/pi";
import { CiSignpostDuo1 } from "react-icons/ci";
import BlogData from './admin/BlogData.jsx';
import PostData from './admin/PostData.jsx';
import Dashboard from './admin/Dashboard.jsx';
import { MdOutlineReport } from "react-icons/md";
import { useAuth0 } from '@auth0/auth0-react';

const DashboardLayout = () => {
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const namespace = 'https://myapp.example.com/';
    const userRoles = user?.[`${namespace}roles`] || [];

    const dashItems = [
        { path: "dashboard", title: "Dashboard", roles: ["Admin"] },
        { path: "Payments", title: "Payments", roles: ["Admin"] },
        { path: "AllUser", title: "All Users", roles: ["Admin"] },
        { path: "BlogData", title: "BlogData", roles: ["Admin", "Applicants"] },
        { path: "EventData", title: "EventData", roles: ["Admin"] },
        { path: "Eventform", title: "EventForm", roles: ["Recruiter"] },
        { path: "MyEvents", title: "My Event", roles: ["Recruiter"] },
        { path: "UserPayment", title: "MyPayments", roles: ["Applicants"] },
        { path: "Content", title: "ContentForm", roles: ["Admin", "Recruiter", "Applicants"] },
        { path: "my-job", title: "MyJobs", roles: ["Recruiter"] },
        { path: "/blogform", title: "Blog Form", roles: ["Admin", "Applicants"] },
    ];
    const hasRole = (roles) => roles?.some(role => userRoles.includes(role));

    return (
        <div>
            <div className="drawer sm:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                    <div className='flex items-center justify-between mx-4'>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboardCustomize /></label>
                        <button className='btn rounded-full px-6 bg-blue flex items-center gap-2 text-white sm:hidden'><FaRegUser />Logout</button>
                    </div>

                    <div className='mt-5 md:mt-2 mx-4'>
                        <ul className="hidden md:flex gap-12">
                            {isAuthenticated ? (
                                <>
                                    {dashItems.map(({ path, title, roles }) => (
                                        (!roles || hasRole(roles)) && (
                                            <li key={path} className="text-base text-primary">
                                                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                                                </NavLink>
                                            </li>
                                        )
                                    ))}
                                </>
                            ) : (
                                <p> You don't access..</p>
                            )}
                        </ul>
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                        <li className='flex justify-start pb-3'>
                            <span className='text-white px-10 font-bold bg-blue mr-20 mb-1'>{userRoles}</span>
                        </li>
                        <hr />
                        {isAuthenticated ? (
                            <>
                                {dashItems.map(({ path, title, roles }) => (
                                    (!roles || hasRole(roles)) && (
                                        <li key={path} className="text-base text-primary">
                                            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                                                {title}
                                            </NavLink>
                                        </li>
                                    )
                                ))}
                            </>
                        ) : (
                            <p> You don't access..</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
