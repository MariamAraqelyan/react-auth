import React from 'react';
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
// const API_URL = "https://wbs.e-teleport.ru";

const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const [cookies, removeCookie] = useCookies(['name']);
    const logout = async () => {

        // axios.post(API_URL + "/logout").then((response:any) => {
        //
        // })
        removeCookie("name", '');
        props.setName('');
    }

    let menu;

    if (props.name === '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/product" className="navbar-brand">Product Page</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
