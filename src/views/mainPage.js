import React, {useContext, useEffect, useState} from "react";
import Header from "./beforeLogin/header/header"
import styled from 'styled-components'
import { UserContext } from "../App";
import LoginHeader from "./afterLogin/header/loginHeader";
import PreviewBoard from "./afterLogin/main/previewBoard";
import PageNum from "./afterLogin/main/pageNum";
import {instance} from "../util/axiosSetting";

export default function MainPage(){
    const user = useContext(UserContext)
    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(()=>{
        (async()=>{
            try{
                const pages = (await getPages()).data;
                setPage(pages);
            }catch(error){
                console.log(error);
            }
        })();
    }, [])

    useEffect(()=>{
        (async ()=>{
            try{
                const posts = (await getPosts()).data;
                setPosts(posts)
            }catch(error){
                console.log(error)
            }
        })();
    }, [currentPage])

    const getPosts = () => {
        return instance.get(`/api/board?page=${currentPage}&size=2`)
    }

    const getPages = () => {
        return instance.get("/api/board/pages")
    }

    const setPageNum = () => {
        const arr = []
        for(let i=0;i<page/2;i++){
            arr.push(<PageNum key={i} state={currentPage} setState={setCurrentPage} num={i} />)
        }
        return arr;
    }

    return(
        <div>
            {user.isLogin ? <LoginHeader/> : <Header />}
            <Adv src="img/bsnyou.png" alt="icon" />
            <PostContainer>
                <div>
                    {posts.map((value) => {
                        return(
                            <PreviewBoard value={value} key={value.id} />
                        )
                    })}
                </div>
                <PageContainer>
                    {setPageNum()}
                </PageContainer>
            </PostContainer>
        </div>
    )
}

const PageContainer = styled.div`
  display: flex;
`

const Adv = styled.img`
    margin-left: 75%;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    height: 450px;
`

const PostContainer = styled.div`
  margin-top: 8rem;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translate(0, -60%);
`

