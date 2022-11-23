import styled from 'styled-components'
import {Header} from "../../allFiles";

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
  margin-top: 200px;
  font-size: 50px;
`

export default Forbidden;