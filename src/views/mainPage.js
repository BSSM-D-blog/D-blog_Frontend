import React, {useContext, useLayoutEffect, useState} from "react";
import Header from "./beforeLogin/header/header"
import styled from 'styled-components'
import { UserContext } from "../App";
import LoginHeader from "./afterLogin/header/loginHeader";
import PreviewBoard from "./afterLogin/main/previewBoard";
import PageNum from "./afterLogin/main/pageNum";
import {instance} from "../util/axiosSetting";
import ReactLoading from 'react-loading';

export default function MainPage(){
    const user = useContext(UserContext)
    const [posts, setPosts] = useState([{
        category: "",
        content: "",
        created: "",
        filePath: "",
        id: 0,
        profile: "",
        title: "",
        user: "",
        userid: 0,
        username: "",
    }]);

    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const pages = (await instance.get("/api/board/pages")).data;
                setPage(pages);
                setLoading(false);
            }catch(error){
                console.log(error);
            }
        })();
    }, [])

    useLayoutEffect(()=>{
        (async ()=>{
            try{
                setLoading(true)
                const posts = (await instance.get(`/api/board?page=${currentPage}`)).data;
                setPosts(posts)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        })();
    }, [currentPage])

    const setPageNum = () => {
        const arr = []
        for(let i=0;i<page;i++){
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
                    {!loading && Object.values(posts).map((value, index) => {
                            return (
                                <PreviewBoard value={value} key={index}/>
                            )
                        })
                    }
                    {user.isLogin && loading &&
                        <ReactLoading
                            className={"loading"}
                            type={"bubbles"}
                            color={"#000000"}
                            width={200}
                            height={200}
                        />}
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
  .loading{
    margin-bottom: 10rem;
  }
`

