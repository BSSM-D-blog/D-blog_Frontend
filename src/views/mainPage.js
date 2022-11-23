import React, {useContext, useState} from "react";
import Header from "./beforeLogin/header/header"
import styled from 'styled-components'
import { userContext } from "../App";
import LoginHeader from "./afterLogin/header/loginHeader";

export default function MainPage(){
    const user = useContext(userContext)
    return(
        <div>
            {user.isLogin ? <LoginHeader/> : <Header />}
            <Text className="Text"></Text>
            <Adv src="img/bsnyou.png" />
            <Text className="Text"></Text>
        </div>
    )
}


const Text = styled.div`
    margin-left: 80px;
    margin-top: 72px;
    border: solid 5px black;
    width: 800px;
    height: 250px;
`

const Adv = styled.img`
    margin-left: 70%;
    position: fixed;
    bottom: 43px;
`