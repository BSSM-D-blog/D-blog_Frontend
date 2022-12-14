import styled from 'styled-components'
import Header from "./header/header";
import {Link} from "react-router-dom";

const Forbidden = () => {
    return(
        <Flex>
            <Header/>
            <Title>로그인 후 이용이 가능한 서비스입니다.</Title>
            <GoMain to={"/"}>메인으로 돌아가기</GoMain>
        </Flex>
    )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h1`
  padding-top: 250px;
  font-size: 50px;
`

const GoMain = styled(Link)`
  margin-top: 250px;
  color: black;
  font-size: 40px;
`

export default Forbidden;