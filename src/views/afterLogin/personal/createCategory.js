import {useState} from "react";
import {instance} from "../../../util/axiosSetting";
import styled from "styled-components";

export default function CreateCategory({closeModal}){
  const postCategory = () => {
        instance.post("/api/category", {
            "name": category
        })
            .then((res)=>{
              closeModal();
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const [category, setCategory] = useState("");

    return(
        <FormContainer >
            <p>카테고리 이름</p>
            <input type={"text"} value={category} onChange={(e)=> setCategory(e.target.value)} />
            <button onClick={postCategory}>만들기</button>
        </FormContainer>
    )
}

const FormContainer = styled.div`
  p{
    font-size: 18px;
  }
  input[type="text"]{
    width: 90%;
    font-size: 18px;
    padding: 5px;
    margin-top: 20px;
    border: 2px solid black;
  }
  display: flex;
  flex-direction: column;
  button {
    width: 70px;
    height: 35px;
    border: none;
    border-radius: 10px;
    margin: 40px auto auto;
    background-color: #6667AB;
    color: white;
  }
`