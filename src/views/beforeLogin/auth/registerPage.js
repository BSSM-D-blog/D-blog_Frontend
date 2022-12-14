import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import { instance } from "../../../util/axiosSetting";

export default function RegisterPage()
{
    const nav = useNavigate();
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

    const postUser = async () => {
        try{
            const result = await instance.post("/auth/signup", user);
            console.log(result.data);
            if(result.data) {
                alert('성공');
                nav('/login');
            }
            else alert('실패');
        }catch(error){
            alert('실패');
            console.log(error);
        }
    }

    return(
        <div>
            <Header />
            <Register>회원가입</Register>
            <RegisterContainer>
                <IBox type="text" name="username" value={user.username} onChange={change} placeholder="아이디"/>
                <IBox type="password" name="password1" value={user.password1} placeholder="비밀번호" onChange={change} />
                <IBox type="password" name="password2" value={user.password2} placeholder="비밀번호 체크" onChange={change} />
                <IBox type="text" name="nickname" value={user.nickname} placeholder="닉네임" onChange={change} />
                <RegisterButton onClick={postUser}>회원가입</RegisterButton>
            </RegisterContainer>
        </div>
    )
}

const Register = styled.h1`
    font-size:40px;
    text-align: center;
    padding-top: 150px;
`

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const IBox = styled.input`
    margin-top: 50px;
    border: solid 2px;
    width: 550px;
    height: 50px;
    font-size: 25px;
    text-align: center;
  font-family: maplestory, sans-serif;
`

const RegisterButton = styled.button`
    background-color: #6667AB;
    font-size: 22px;
    color: #FFFFFF;
    width: 160px;
    height: 50px;
    border-radius: 20px;
    border: none;
    margin-top: 60px;
    font-family: maplestory, sans-serif;
`