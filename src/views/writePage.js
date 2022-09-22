import React from "react";
import styled from "styled-components";
import Header from "./header";
import '../styles/styles.css';
export default function writePage()
{
    return(
        <writePage>
            <Header />
            <h2>제목</h2>
            <input type="text" className="title_w"/>
            <h2>내용</h2>
            <input type="text" className="content_w"/>
        </writePage>
    )
}