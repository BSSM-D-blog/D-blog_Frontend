import React, { useContext, useEffect, useState } from 'react';
import LoginHeader from "../header/loginHeader";
import styled from 'styled-components';
import { UserContext } from '../../../App';
import { instance } from '../../../util/axiosSetting';
import { useNavigate } from 'react-router-dom';

function WritePage() 
{
    const nav = useNavigate();
    const user = useContext(UserContext);
    const [input, setInput] = useState({
        user: user.username,
        title: "",
        content: "",
        category: null,
        file: null,
    })
    const [files, setFiles] = useState();
    const [category, setCategory] = useState([]);

    if(!user.isLogin) nav("/forbidden")

    const change = (e) => {
        const { name, value } = e.target;
        const newInput = {
            ...input,
            [name]: value
        };
        setInput(newInput);
    }

    useEffect(()=>{
        instance.get('/api/category')
        .then((response)=>{
            setCategory(response.data)
        })
        .catch((error)=>{
            console.log(error)  
        })
    }, [])

    const fileChange = (e) => {
        const newInput = {
            ...input,
            file: e.target.files[0]
        }
        setInput(newInput);
        setFiles(e.target.files[0].name);
    }

    const postBoard = (e) => {
        e.preventDefault();
        const data = new FormData();
        if(input.file !== null) data.append('file', input.file);
        if(input.category !== null) data.append("category", input.category)
        data.append("user", user.username)
        if(input.title === ""){
            alert("제목이 입력되지 않았습니다.");
            return false
        }
        else data.append("title", input.title)
        if(input.content === ""){
            alert("본문이 입력되지 않았습니다.")
            return false
        }
        else data.append("content", input.content)
        
        instance.post("/api/board", data, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        })
        .then(()=>{
            nav("/")
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div>
            <LoginHeader />
            <form onSubmit={postBoard}>
                <WriteUl>
                    <li>
                        <p>제목</p>
                        <input type="text" name="title" value={input.title} onChange={change} />
                    </li>
                    <li>
                        <p>카테고리</p>
                        <select name="category" onChange={change}>
                            <option value={""} hidden>카테고리를 선택해주세요.</option>
                            {category.map((value, index)=>{
                                return <option key={index} value={value.category}>{value.name}</option>
                            })}
                        </select>
                    </li>
                    <li>
                        <p>내용</p>
                        <textarea value={input.content} name="content" onChange={change} />
                    </li>
                    <li>
                        <p>파일첨부</p>
                        <div>
                            <input type="text" value={files} placeholder="첨부파일 (이미지만 가능합니다)" readOnly />
                            <label htmlFor='file_post'>파일 선택</label>
                            <input id="file_post" accept='image/jpg, image/png, image/jpeg, svg' type={"file"} onChange={fileChange} name="file" />
                        </div>
                    </li>
                    <Center>
                        <input type="submit" value="작성하기" />
                    </Center>
                </WriteUl>
            </form>
        </div>
    );
}

const Center = styled.li`
    text-align: center;
    margin-top: 40px;
    input{
        width: 120px;
        height: 40px;
        color: white;
        font-size: 15px;
        border: none;
        background-color: #6667AB;
        border-radius: 20px;
        outline: none;
    }
`

const WriteUl = styled.ul`
    list-style: none;
    padding-top: 120px;
    margin: 0 auto;
    width: 40%;
    li{
        margin-bottom: 20px;
        width: 100%;
        p{
            font-size: 25px;
            margin-bottom: 10px;
        }
        input[type="text"]{
            padding: 5px 10px;
            border: 2px solid black;
            height: 25px;
            font-size: 18px;
            width: 100%;
            border-radius: 10px;
        }
        select{
            border: 2px solid black;
            font-size: 17px;
            padding: 5px 10px;
            border-radius: 10px;
            width: 250px;
        }
      option{
        width: 250px;
      }
        textarea{
            border: 2px solid black;
            font-size: 18px;
            padding: 10px;
            border-radius: 10px;
            width: 100%;
            height: 200px;
        }
        div{
            display: flex;
            align-items: center;
            position: relative;
            label{
                position: absolute;
                right: 10px;
                cursor: pointer;
            }
            input[type="file"]{
                position: absolute;
                width: 0;
                height: 0;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
            }
            input[type="text"]{
                font-size: 15px;
                color: black
            }
        }
    }
`

export default WritePage;

