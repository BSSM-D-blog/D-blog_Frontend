import React, { useState, useContext, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../App";
import { instance } from "../../../util/axiosSetting";
import LoginHeader from "../header/loginHeader";

export default function ReadPage(){

    const nav = useNavigate();
    const user = useContext(UserContext);
    const param = useParams();
    const [board, setBoard] = useState({
      id: 0,
      title: "",
      content: "",
      created: "",
      user: "",
      filePath: "",
      category: "",
      profile: "",
        username: "",
        userid: 0,
    });
    const [comment, setComment] = useState({
      content: "",
      user: user.id,
      board: param.id,
      parents: 0,
    });
    const [getComment, setGetComment] = useState([])
    const [refresh, setRefresh] = useState(true);

    if(!user.isLogin) nav("/forbidden")

    useEffect(()=>{
      (async ()=>{
          try{
              const data = (await instance.get(`/api/board/${param.id}`)).data
              console.log(data);
              const newDate = (data.created.substring(0, 10) + " " + (data.created.substring(12, 13)).padStart(2, "0") + data.created.substring(13, 19)).replaceAll("-", "/")
              const newBoard = {
                  ...data,
                  created: newDate,
              }
              setBoard(newBoard);

              const res = (await instance.get(`/api/comment/${param.id}`)).data
              console.log(res.data);
              setGetComment(res.data);
          }catch(error){
              console.log(error)
          }
      })();
    }, [refresh])

    const commentHandler = (e) => {
      const {value, name} = e.target;
      const newComment = {
        ...comment,
        [name]: value,
      }
      setComment(newComment);
    }

    const postComment = () => {
      instance.post(`/api/comment`, comment)
      .then((response)=>{
        const newComment = {
          ...comment,
          content: ""
        }
        setComment(newComment);
        setRefresh((prev)=> !prev);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    const goToUserProfile = (id) => {
        nav(`/personal/${id}`)
    }

    return(
        <RootContainer>
            <LoginHeader />
            <ReadContainer>
                <Profile onClick={()=> goToUserProfile(board.userid)}>
                    {board.profile !== null ? <img src={"http://" + board.profile} alt="icon"/>
                        :<img src={"/img/defaultUserProfile.png"} alt={"icon"} />}
                    <span>{board.user}</span>
                </Profile>
                <Title>
                    <p>{board.title}</p>
                    <BoardInfo>
                        <p>{board.created}</p>
                    </BoardInfo>
                </Title>
                <Content>
                    <p>{board.content}</p>
                    {board.filePath === "" ? <></> : <img src={"http://" + board.filePath} alt={"boardFile"} />}
                </Content>
            </ReadContainer>
            <WriteContainer>
                <WriteComment>
                    <div>
                        {user.profile ?
                            <img src={"http://" + user.profile} alt={"profile"} />
                        :
                            <img src={"/img/defaultUserProfile.png"} alt="profile" />
                        }
                        <p>{user.nickname}</p>
                    </div>
                    <textarea value={comment.content} name="content" onChange={commentHandler} />
                </WriteComment>
                <button onClick={postComment}>작성</button>
            </WriteContainer>
            <CommentContainer>
                {getComment.map((value)=> {
                    const newDate = value.created.substring(0, 10) + " " + value.created.substring(11, 19);
                    return(
                        <Comment key={value.id}>
                            <Info onClick={()=> goToUserProfile(value.userid)}>
                                {value.profile !== null ?
                                <img src={"http://" + value.profile} alt={"profile"} />
                                :
                                <img src={"/img/defaultUserProfile.png"} alt={"profile"} />}
                                <div>
                                    <p>{value.nickname}</p>
                                    <p>{newDate}</p>
                                </div>
                            </Info>
                            <p className={"content"}>{value.content}</p>
                        </Comment>
                    )
                })}
            </CommentContainer>
        </RootContainer>
    )
}

const Comment = styled.div`
  .content{
    font-size: 23px;
    margin-top: 20px;
  }
  margin-top: 45px;
`

const CommentContainer = styled.div`
  width: 65%;
  margin: 70px auto auto;
`

const Info = styled.div`
  img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  display: flex;
  align-items: center;
  cursor: pointer;
  div{
    font-size: 15px;
    margin-left: 15px;
  }
`

const WriteComment = styled.div`
  div{
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    p{
      font-size: 1.2rem;
    }
    margin-right: 20px;
  }
  display: flex;
  align-items: center;
  textarea{
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: 2px solid black;
  }
  width: 100%;
`

const WriteContainer = styled.div`
  button{
    margin-top: 30px;
    background: #6667AB;
    border-radius: 20px;
    width: 100px;
    height: 45px;
    border: none;
    color: white;
    font-size: 18px;
    font-family: maplestory,sans-serif;
  }
  width: 65%;
  margin: 50px auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const Content = styled.div`
  p{
    font-size: 1.5rem;
  }
  width: 80%;
  margin-top: 60px;
  img{
    margin-top: 20px;
    width: 20rem;
    height: 20rem;
  }
`

const Title = styled.div`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  margin-top: 30px;
  display: flex;
  align-items: flex-end;
  position: relative;
  p{
    font-size: 2rem;
  }
`

const BoardInfo = styled.div`
  p{
    font-size: 1rem;
    margin-left: 10px;
  }
  display: flex;
  align-items: flex-end;
  position: absolute;
  right: 0;
`

const Profile = styled.div`
  img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  width: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  span{
    margin-left: 10px;
    font-size: 1.3rem;
  }
`

const ReadContainer = styled.div`
  width: 65%;
  margin: 0 auto;
  padding-top: 170px;
  height: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 50px;
`

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;    
`