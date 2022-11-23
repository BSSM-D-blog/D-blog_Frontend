import React, { useState } from "react";
import styled from "styled-components";
import { Header } from '../../../allFiles'
import { useNavigate } from "react-router-dom";
import {noAuthInstance} from "../../../util/instance";
import axios from "axios";

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
            const result = await axios.post("/signup", user);
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
                <IBox type="text" name="username" value={user.username} onChange={(e)=>{change(e)}} placeholder="아이디"/>
                <IBox type="password" name="password1" value={user.password1} placeholder="비밀번호" onChange={(e)=>{change(e)}} />
                <IBox type="password" name="password2" value={user.password2} placeholder="비밀번호 체크" onChange={(e)=>{change(e)}} />
                <IBox type="text" name="nickname" value={user.nickname} placeholder="닉네임" onChange={(e)=>{change(e)}} />
                <RegisterButton onClick={postUser}>회원가입</RegisterButton>
            </RegisterContainer>
        </div>
    )
}

const Register = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:70px;
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
`

const RegisterButton = styled.button`
    background-color: #6667AB;
    border-color: #6667AB;
    font-size: 25px;
    color: #FFFFFF;
    width: 200px;
    height: 60px;
    border-radius: 20px;
    margin-top: 40px;
`