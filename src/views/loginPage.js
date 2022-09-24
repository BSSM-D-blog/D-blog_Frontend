import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';
import { instance } from "../instance";

export default function LoginPage()
{
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const change = (e) => {
        const { name, value } = e.target;
        const newInput = {
            ...login,
            [name]: value
        };
        setLogin(newInput);
    }

    const postLogin = async () => {
        try{
            await instance.post('/login', login)
            alert('성공');
        }catch(error){
            alert('실패');
            console.log(error);
        }
    }

    return(
        <loginPage>
            <Header />
            <Login>로그인</Login>
            <input type="text" className ="idbox_l" name="username" value={login.username} onChange={(e)=>change(e)} placeholder="아이디"/><br />
            <input type="password" className="pwbox_l" name="password" value={login.password} onChange={(e)=>change(e)} placeholder="비밀번호" /><br />
            <button className="logbutton" onClick={postLogin}>로그인</button>
        </loginPage>
    )
}

const Login = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:110px;
`;
