import React from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link } from "react-router-dom";

export default function Header()
{
    return(
        <StyledHeader>
            <Link to = "/">
            <Name>D-blog</Name></Link>
            <Link to = "/write">
            <Writing>글 쓰기</Writing></Link>
            <Link to = "/login">
            <Login>로그인</Login></Link>
            <Link to = "/register">
            <Register>회원가입</Register></Link>
        </StyledHeader>

    )
}

const StyledHeader = styled.div`
    background-color: #6667AB;
    width: 100%;
    height: 90px;
    color: #CACBD6;
    display: flex;
    align-items:center;
    `

const Writing = styled.h1`
    margin-left: 65px;
`

const Name = styled.h1`
    margin-left: 50px;
    font-size: 55px;

`
const Login = styled.h1`
    color: #CACBD6;
    margin-left: 1020px;
    
`
const Register = styled.h1`
    color: #CACBD6;
    margin-left: 70px;
`