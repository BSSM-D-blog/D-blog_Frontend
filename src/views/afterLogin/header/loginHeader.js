import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {userContext} from "../../../App";

const LoginHeader = () => {
    const user = useContext(userContext);
    const nav = useNavigate()
    if(!user.isLogin){
        nav('/forbidden')
    }
    return(
        <StyledHeader>
            <Link to = "/">
                <Name>D-blog</Name></Link>
            <Link to = "/write">
                <Writing>글 쓰기</Writing></Link>
            <div></div>
            <Link to = "/login">
                <Login>로그인</Login>
            </Link>
            <Link to = "/register">
                <Register>회원가입</Register>
            </Link>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    background-color: #6667AB;
    width: 100%;
    height: 90px;
    color: #CACBD6;
    display: grid;
    grid-template-columns: 200px 200px 1fr 100px 200px;
    align-content: center;
`

const Writing = styled.h1`
    margin-left: 30px;
    color: #CACBD6;
    cursor: pointer;
`

const Name = styled.h1`
    font-size: 40px;
    color: #CACBD6;
    margin-left: 30px;
    cursor: pointer;
    
`
const Login = styled.h1`
    color: #CACBD6;
    cursor: pointer;
`
const Register = styled.h1`
    margin-left: 35px;
    color: #CACBD6;
    cursor: pointer;
`

export default LoginHeader