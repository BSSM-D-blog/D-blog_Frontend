import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';

export default function RegisterPage()
{
    const [user, setUser] = useState({
        username: "",
        password1: "",
        password2: "",
        nickname: ""
    });

    const change = (e) => {
        const { name, value } = e.target;
        const newInput = {
            ...user,
            [name]: value
        };
        setUser(newInput);
    }

    return(
        <div>
            <Header />
            <Register>회원가입</Register>
            <input type="text" className ="idbox_r" name="username" value={user.username} onChange={(e)=>{change(e)}} placeholder="아이디"/><br />
            <input type="password" className="pwbox_r" name="password1" value={user.password1} placeholder="비밀번호" onChange={(e)=>{change(e)}} /><br />
            <input type="password" className="pwchbox_r" name="password2" value={user.password2} placeholder="비밀번호 체크" onChange={(e)=>{change(e)}} /><br />
            <input type="text" className="namebox_r" name="nickname" value={user.nickname} placeholder="닉네임" onChange={(e)=>{change(e)}} /><br />
            <button className="regbutton">회원가입</button>
        </div>
    )
}

const Register = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:70px;
`