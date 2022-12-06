import styled from "styled-components";

export default function PreviewBoard(props)
{
    const value = props.value;
    const newDate = (value.created.substring(0, 10) + " " + value.created.substring(12, 19)).replaceAll("-", "/")
    
    return(
        <Root key={value.id}>
            <div>
                <ProfileContainer>
                    {value.profile ?
                        <Profile src={value.profile} alt={"icon"} /> :
                        <Profile src={"/img/defaultUserProfile.png"} alt="icon"/>
                    }
                    <UserContainer>
                        <p>{value.user}</p>
                        <p>{newDate}</p>
                    </UserContainer>
                </ProfileContainer>
                <ContentContainer>
                    <Content>
                        <p>{value.title}</p>
                        <p>{value.content}</p>
                    </Content>
                </ContentContainer>
            </div>
            {value.filePath && <img className={"content-img"} src={`http://${value.filePath}`} alt={"icon"} />}
        </Root>
    )
}

const Root = styled.div`
  margin-bottom: 30px;
  width: 500px;
  height: 200px;
  display: flex;
  position: relative;
  cursor: pointer;
  .content-img {
    width: 150px;
    height: 150px;
    right: 0;
    position: absolute;
  }
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 10px;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserContainer = styled.div`
  font-size: 14px;
  p{
    margin-top: 3px;
    margin-bottom: 2px;
  }
`

const ContentContainer = styled.div`
  display: flex;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  margin-top: 10px;
  p:nth-child(1){
    font-size: 20px;
    margin-bottom: 10px;
  }
`