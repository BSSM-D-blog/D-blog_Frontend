import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../../../App";
import { AiOutlineUser } from "react-icons/ai";
import LoginHeaderModal from "./loginHeaderModal";

const LoginHeader = () => {
    const [modal, setModal] = useState(false)

    const user = useContext(UserContext);
    const navigator = useNavigate();

    const loginHeaderModal = () => {
        setModal((prev)=>!prev);
    }

    return(
        <StyledHeader>
            <Link to = "/">
                <Name>D-blog</Name></Link>
            <Link to = "/write">
                <Writing>글 쓰기</Writing></Link>
            <div></div>
            <ProfileContainer onClick={loginHeaderModal}>
                {modal && <LoginHeaderModal user={user} />}
                <span>{user.nickname}</span>
                {user.profile === null ? 
                    <AiOutlineUser className='user-profile' /> :
                    <img src={"http://" + user.profile} className="user-profile" alt="icon" /> }
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
    align-items: center;
    position: fixed;
    z-index: 3;
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
    color: #CACBD6;
  position: relative;
  height: 100%;
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