import React from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';

export default function registerPage()
{
    return(
        <registerPage>
        <Header />
        <Register>회원가입</Register>
        <input type="text" className ="idbox_r" placeholder="아이디"/><br />
        <input type="password" className="pwbox_r" placeholder="비밀번호" /><br />
        <input type="password" className="pwchbox_r" placeholder="비밀번호 체크" /><br />
        <input type="text" className="namebox_r" placeholder="닉네임" /><br />
        <button className="regbutton">회원가입</button>
        </registerPage>
    )
}

const Register = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:70px;
`