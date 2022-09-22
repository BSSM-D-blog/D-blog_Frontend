import React from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function header()
{
    return(
        <Header>
            <Name>D-blog</Name>
            <Writing>글 쓰기</Writing>
            <Login>로그인</Login>
            <Register>회원가입</Register>
        </Header>

    )
}

const Header = styled.div`
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