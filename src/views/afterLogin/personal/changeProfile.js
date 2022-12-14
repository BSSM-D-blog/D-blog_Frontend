import {useState} from "react";
import {instance} from "../../../util/axiosSetting";
import styled from "styled-components";

export default function ChangeProfile({closeModal}){

    const [file, setFile] = useState("");
    const [img, setImg] = useState("");

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
        encodeFileToBase64(e.target.files[0]).then((res)=> {});
    }

    const change = () => {
        const data = new FormData();
        data.append("file", file);
        instance.put("/api/userinfo", data, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        })
            .then((res)=>{
                closeModal();
            })
            .catch((error)=>{
                console.log(error)
                alert("실패했습니다.")
                closeModal();
            })
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImg(reader.result);
                resolve();
            };
        });
    }

    return(
        <ChangeProfileRoot>
            <p className={"title"}>아래 버튼을 눌러 프로필을 바꿀 수 있습니다.</p>
            <label htmlFor={"change_file"}>파일 선택</label>
            <input id={"change_file"} type={"file"} onChange={fileHandler} accept='image/jpg, image/png, image/jpeg, svg' />
            {img &&
                <div>
                    <p>미리보기</p>
                    <img src={img} alt={"icon"} />
                </div>
            }
            <button onClick={change}>변경하기</button>
        </ChangeProfileRoot>
    )
}

const ChangeProfileRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title{
    margin-top: 10px;
    font-size: 18px;
    margin-bottom: 25px;
  }
  img{
    width: 250px;
    height: 150px;
    object-fit: cover;
  }
  label{
    cursor: pointer;
    margin-bottom: 25px;
    border: 1px solid black;
    padding: 10px 20px 10px 20px;
  }
  input{
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  button{
    background-color: #6667AB;
    border: none;
    color: white;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    margin-top: 20px;
  }
`