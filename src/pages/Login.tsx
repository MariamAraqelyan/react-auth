import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {useCookies} from 'react-cookie';

const API_URL = "https://wbs.e-teleport.ru";

const Login = (props: { setName: (name: string) => void }) => {
    const [cookies, setCookie] = useCookies(['name']);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // {withCredentials: true}
        let userInfo = axios.post(API_URL + "/MD5", {
            "input": password
        }).then((md5Data: any) => {
            return axios.post(API_URL + "/auth/credentials", {
                "UserName": email,
                "Password": md5Data.data
            }).then((userData: AxiosResponse) => {
                setCookie('name', userData.data.UserName, {path: '/'});
                return userData.data;
            }).catch((err) => {
                console.log(err)
            });
        })

        let content = userInfo;
        setRedirect(true);
        props.setName(cookies.name);
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;
