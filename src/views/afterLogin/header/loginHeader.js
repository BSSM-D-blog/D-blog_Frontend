import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../../../App";
import { AiOutlineUser } from "react-icons/ai";

const LoginHeader = () => {

    const user = useContext(UserContext);
    const nav = useNavigate()
    const [userinfo, setUserinfo] = useState();

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
            <ProfileContainer>
                <span>{user.nickname}</span>
                {user.profile === null ? 
                    <AiOutlineUser className='user-profile' /> :
                    <img src={user.profile} className="user-profile" alt="icon" /> }
            </ProfileContainer>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    background-color: #6667AB;
    width: 100%;
    height: 80px;
    color: #CACBD6;
    display: grid;
    grid-template-columns: 200px 200px 1fr 200px;
    align-content: center;
`

const Writing = styled.h1`
    margin-left: 30px;
    color: #CACBD6;
    cursor: pointer;
`

const Name = styled.h1`
    font-size: 35px;
    color: #CACBD6;
    margin-left: 30px;
    cursor: pointer;
`

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    span{
        margin-right: 20px;
    }
    .user-profile{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
`

export default LoginHeader