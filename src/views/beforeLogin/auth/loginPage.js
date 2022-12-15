import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../header/header";
import { instance } from "../../../util/axiosSetting";

export default function LoginPage()
{
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const [disable, setDisable] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        const newInput = {
            ...login,
            [name]: value
        };
        setLogin(newInput);
    }

    const postLogin = (e) => {
        e.preventDefault();
        instance.post('/auth/login', login)
        .then((response)=>{
            console.log(response);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            alert('성공');
            setDisable(true);
            window.location.href= "/"
            // nav("/");
        })
        .catch((error)=>{
            alert('실패');
            console.log(error);
        })
    }

    return(
        <div>
            <Header />
            <LoginContainer onSubmit={postLogin}>
                <Login>로그인</Login>
                <InputBox type="text" name="username" value={login.username} onChange={change} placeholder="아이디" />
                <InputBox type="password" name="password" value={login.password} onChange={change} placeholder="비밀번호" />
                <LoginButton type="submit" disabled={disable}>로그인</LoginButton>
                <GotoRegister to="/register">회원가입 하러가기</GotoRegister>
            </LoginContainer>
        </div>
    )
}

const GotoRegister = styled(Link)`
    margin-top: 50px;
    font-size: 20px;
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

const InputBox = styled.input`
    margin-top: 60px;
    border: solid 2px;
    width: 550px;
    height: 50px;
    font-size: 25px;
    text-align: center;
`

const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  padding-top: 150px;
`

const Login = styled.label`
    font-size: 45px;
    text-align: center;
`;
