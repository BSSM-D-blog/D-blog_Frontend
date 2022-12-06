import styled from "styled-components";

const PageNum = ({num, state, setState}) => {

    const changePage = () => {
        setState(num);
    }

    return <Button state={state} num={num} onClick={changePage} >{num+1}</Button>
}

const Button = styled.button`
  width: 30px;
  margin: 0 7px 0 7px;
  background-color: ${({ state, num }) => ( state === num ? "#C7C7ED" : "#999AE3" )};
  border: none;
  color: ${({ state, num }) => ( state === num ? "#928DCA" : "white" )};
  height: 30px;
  border-radius: 10px;
`

export default PageNum