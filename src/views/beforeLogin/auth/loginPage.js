import React, { useState } from "react";
import styled from "styled-components";
import { Header } from '../../../allFiles'
import {Link, useNavigate} from "react-router-dom";
import {noAuthInstance} from "../../../util/instance";
import axios from "axios";

export default function LoginPage()
{
    const nav = useNavigate();
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
            const response = (await axios.post('/login', login)).data
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
            alert('성공');
            nav('/')
        }catch(error){
            alert('실패');
            console.log(error);
        }
    }

    return(
        <div>
            <Header />
            <LoginContainer>
                <Login>로그인</Login>
                <Idbox type="text" name="username" value={login.username} onChange={(e)=>change(e)} placeholder="아이디" />
                <Idbox type="password" name="password" value={login.password} onChange={(e)=>change(e)} placeholder="비밀번호" />
                <LoginButton onClick={postLogin}>로그인</LoginButton>
                <GotoRegister to="/register">회원가입 하러가기</GotoRegister>
            </LoginContainer>
        </div>
    )
}

const GotoRegister = styled(Link)`
    margin-top: 50px;
    font-size: 15px;
    color: black;
`

const LoginButton = styled.button`
    background-color: #6667AB;  
    border-color: #6667AB;
    font-size: 25px;
    color: #FFFFFF;
    width: 200px;
    height: 60px;
    border-radius: 20px;
    margin-top: 80px;
`

const Idbox = styled.input`
    margin-top: 60px;
    border: solid 2px;
    width: 550px;
    height: 50px;
    font-size: 25px;
    text-align: center;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Login = styled.h1`
    font-size: 45px;
    text-align: center;
    margin-top: 90px;
`;
