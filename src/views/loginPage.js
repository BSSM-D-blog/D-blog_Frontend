import React from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';

export default function loginPage(){
    return(
        <loginPage>
            <Header />
            <Login>로그인</Login>
            <input type="text" className ="idbox_l" placeholder="아이디"/><br />
            <input type="password" className="pwbox_l" placeholder="비밀번호" /><br />
            <button className="logbutton">로그인</button>
        </loginPage>
    )
}

const Login = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:110px;
`;
