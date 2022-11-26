import React, { useContext } from "react";
import Header from "./beforeLogin/header/header"
import styled from 'styled-components'
import { UserContext } from "../App";
import LoginHeader from "./afterLogin/header/loginHeader";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PreviewBoard from "./afterLogin/board/previewBoard";

export default function MainPage(){
    const user = useContext(UserContext)
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        (async()=>{
            try{
                setPosts({
                    ...(await getPosts()).data
                })
            }catch(error){
                console.log(error);
            }
        })();
    })

    const getPosts = () => {
        return axios.get("/api/board", {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
    }

    return(
        <div>
            {user.isLogin ? <LoginHeader/> : <Header />}
            <Adv src="img/bsnyou.png" alt="icon" />
            <PostContainer>
                {posts.map((value, index) => {
                    return(
                        <PreviewBoard />
                    )
                })}
            </PostContainer>
        </div>
    )
}

const PostContainer = styled.div`

`

const Adv = styled.img`
    margin-left: 75%;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    height: 450px;
`