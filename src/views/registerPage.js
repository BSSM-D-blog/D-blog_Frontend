import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';
import { instance } from "../instance";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 5ce27cb0306c1d24820fd18c0ef9afeb09186973

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

<<<<<<< HEAD
    const givereg = async () => {
        try{
            console.log('실행')
            instance.post('/signup', user)
        }catch(error){
            console.log(error)
=======
    const postUser = async () => {
        try{
            const result = await instance.post("/signup", user);
            console.log(result.data);
            if(result.data) {
                alert('성공');
                nav('/login');
            }
            else alert('실패');
        }catch(error){
            alert('실패');
            console.log(error);
>>>>>>> 5ce27cb0306c1d24820fd18c0ef9afeb09186973
        }
    }

    return(
        <div>
            <Header />
            <Register>회원가입</Register>
            <input type="text" className ="idbox_r" name="username" value={user.username} onChange={(e)=>{change(e)}} placeholder="아이디"/><br />
            <input type="password" className="pwbox_r" name="password1" value={user.password1} placeholder="비밀번호" onChange={(e)=>{change(e)}} /><br />
            <input type="password" className="pwchbox_r" name="password2" value={user.password2} placeholder="비밀번호 체크" onChange={(e)=>{change(e)}} /><br />
            <input type="text" className="namebox_r" name="nickname" value={user.nickname} placeholder="닉네임" onChange={(e)=>{change(e)}} /><br />
<<<<<<< HEAD
            <button className="regbutton" onClick={givereg}>회원가입</button>
=======
            <button className="regbutton" onClick={postUser}>회원가입</button>
>>>>>>> 5ce27cb0306c1d24820fd18c0ef9afeb09186973
        </div>
    )
}

const Register = styled.h1`
    font-size:40px;
    text-align: center;
    margin-top:70px;
`