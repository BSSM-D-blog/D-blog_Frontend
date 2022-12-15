import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LoginHeaderModal({user}){

  const nav = useNavigate();
    const goMyPage = () => {
        nav(`/personal/${user.id}`)
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return(
        <ModalRoot>
            <button onClick={goMyPage}>마이 페이지</button>
            <button onClick={logout}>로그 아웃</button>
        </ModalRoot>
    )
}

const ModalRoot = styled.div`
  position: absolute;
  top: 100%;
  width: 180px;
  height: 100px;
  button{
    color: white;
    background-color: #C7C7ED;
    border: none;
    cursor: pointer;
    font-size: 20px;
    width: 100%;
    height: 50%;
  }
  button:nth-child(2){
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  button:nth-child(1):hover{
    color: #6667AB;
  }
  button:nth-child(2):hover{
    color: red;
  }
`