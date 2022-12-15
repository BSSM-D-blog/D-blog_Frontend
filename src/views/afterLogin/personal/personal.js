import styled from "styled-components";
import LoginHeader from "../header/loginHeader";
import {useContext, useLayoutEffect, useState} from "react";
import {instance} from "../../../util/axiosSetting";
import {useParams} from "react-router-dom";
import PreviewBoard from "../main/previewBoard";
import { AiFillCaretDown, AiFillCaretUp, AiOutlinePlusSquare } from "react-icons/ai"
import {UserContext} from "../../../App";
import Modal from 'react-modal'
import CreateCategory from "./createCategory";
import ChangeProfile from "./changeProfile";
import LinesEllipsis from "react-lines-ellipsis"

const customStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
    },
    content: {
        width: "20%",
        height: "20%",
        margin: "auto",
        borderRadius: "20px",
        borderStartEndRadius: "20px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.40)"
    }
}

const profileCustomStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
    },
    content: {
        width: "20%",
        height: "48%",
        margin: "auto",
        borderRadius: "20px",
        borderStartEndRadius: "20px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.40)"
    }
}

export default function Personal(){

    const user = useContext(UserContext);
    const param = useParams();
    const [personal, setPersonal] = useState({
        profile: "",
        nickname: "",
        category: [],
    })
    const [board, setBoard] = useState([]);
    const [category, setCategory] = useState(0)
    const [on, setOn] = useState(false);
    const [modal, setModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [name, setName] = useState("");
    const [modify, setModify] = useState(false);

    useLayoutEffect(()=>{
        instance.get(`/api/user/${param.id}`)
            .then((response)=>{
                setPersonal(response.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    }, [modal, profileModal, param.id])

    useLayoutEffect(()=>{
        if(category === 0){
            setName("전체")
            instance.get(`/api/board/user/${param.id}`)
                .then((res)=>{
                    setBoard(res.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }else{
            personal.category.map((value)=>{
                if(category === value.category) setName(value.name);
                return null;
            })
            instance.get(`/api/board/user/${user.username}/${category}`)
                .then((res)=>{
                    setBoard(res.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }, [category, param.id, personal.category, user.username]);
    
    const closeModal = () => {
        setModal(false)
    }

    const openModal = () => {
        setModal(true)
    }

    const changeProfile = () => {
        setProfileModal(true)
    }

    const closeChangeProfile = () => {
        setProfileModal(false)
    }

    return(
        <PersonalRoot>
            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyle}
                contentLabel={"Modal"}
                ariaHideApp={false}
            >
                <CreateCategory closeModal={closeModal} mode={1} />
            </Modal>
            <Modal
                isOpen={profileModal}
                onRequestClose={closeChangeProfile}
                style={profileCustomStyle}
                contentLabel={"Modal"}
                ariaHideApp={false}
            >
                <ChangeProfile closeModal={closeChangeProfile} />
            </Modal>
            <LoginHeader />
            <Category>
                {on ?
                    <div>
                        <p onClick={() => setOn(false)}>
                            카테고리
                            <AiFillCaretUp />
                        </p>
                        <AiOutlinePlusSquare className={"plus"} onClick={openModal} />
                    </div>
                    :
                    <div>
                        <p onClick={() => setOn(true)}>
                        카테고리
                        <AiFillCaretDown />
                        </p>
                        <AiOutlinePlusSquare className={"plus"} onClick={openModal} />
                    </div>
                }
                {on && <p onClick={()=> setCategory(0)}>전체</p>}
                {on &&
                    personal.category.map((value, index)=>{
                        return(
                            <LinesEllipsis
                                text={value.name}
                                onClick={()=> setCategory(value.category)}
                                ellipsis={'...'}
                                maxLine={"1"}
                                trimRight
                                basedOn='letters'
                                component={"p"}
                            />
                        )
                })}
            </Category>
            <div className={"content"}>
                <PersonalContainer>
                    <Profile>
                        {personal.profile === null ?
                            <img
                                src={"/img/defaultUserProfile.png"}
                                alt={"icon"}
                                onClick={changeProfile}
                            />
                            :
                            <img
                                src={"http://" + personal.profile}
                                alt={"icon"}
                                onClick={changeProfile}
                            />
                        }
                        <p>{personal.nickname}</p>
                    </Profile>
                    <CategoryName>{name}</CategoryName>
                    <Board>
                        {board.map((value, index)=>{
                            return <PreviewBoard value={value} key={index} />
                        })}
                    </Board>
                </PersonalContainer>
            </div>
        </PersonalRoot>
    )
}

const CategoryName = styled.p`
  font-size: 25px;
  margin-top: 90px;
`

const Category = styled.div`
  width: 150px;
  height: 40px;
  border: none;
  font-size: 20px;
  position: absolute;
  left: 10%;
  top: 40%;
  transform: translate(0, -50%);
  p{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .plus{
    margin-top: 15px;
    margin-left: 20px;
    cursor: pointer;
  }
  div{
    display: flex;
    align-items: center;
  }
`

const PersonalRoot = styled.div`
  width: 100%;
  height: 100%;
  .content{
    padding-top: 150px;
    display: flex;
    justify-content: center;
    position: relative;
    width: 70%;
    margin: 0 auto;
  }
`

const PersonalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
  p{
    font-size: 30px;
    margin-left: 15px;
    font-weight: bold;
  }
`

const Board = styled.div`
    margin-top: 50px;
`