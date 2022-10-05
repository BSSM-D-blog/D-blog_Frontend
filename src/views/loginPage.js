import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';
import { instance } from "../instance";

export default function LoginPage(){

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const change = (e) => {
        const {name, value} = e.target;
        const newInput = {
            ...login,
            [name]: value
        }
        setLogin(newInput);
    }

    const givelog = async () => {
        try{
            const { accessToken, refreshToken } = (await instance.post('/login', login)).data;
            console.log(accessToken, refreshToken)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <Header />
            <Login>로그인</Login>
            <input type="text" className ="idbox_l" name="username" placeholder="아이디" value={login.username} onChange={(e)=> change(e)} id="username"/><br />
            <input type="password" className="pwbox_l" name="password" placeholder="비밀번호" value={login.password} onChange={(e)=> change(e)} id="password"/><br />
            <button className="logbutton" onClick={givelog}>로그인</button>
        </div>
    )
}


const Login = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:110px;
`;
