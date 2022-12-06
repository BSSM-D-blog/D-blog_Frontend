import styled from 'styled-components'
import Header from "./header/header";

const Forbidden = () => {
    return(
        <div>
            <Header/>
            <Title>로그인 후 이용이 가능한 서비스입니다.</Title>
        </div>
    )
}

const Title = styled.h1`
  text-align: center;
  padding-top: 200px;
  font-size: 50px;
`

export default Forbidden;