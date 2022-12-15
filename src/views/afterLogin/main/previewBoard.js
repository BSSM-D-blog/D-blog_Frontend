import { Link } from "react-router-dom";
import styled from "styled-components";
import LinesEllipsis from "react-lines-ellipsis";

export default function PreviewBoard(props)
{
    /** @type {category: "",
        content: "",
        created: "",
        filePath: "",
        id: 0,
        profile: "",
        title: "",
        user: "",
        userid: 0,
        username: "",} */
    const value = props.value;
    const newDate = value.created.substring(0, 10) + " " + value.created.substring(11, 19);

    return(
        <Root key={value.id} to={`/read/${value.id}`}>
            <div>
                <ProfileContainer>
                    {value.profile ?
                        <Profile src={"http://" + value.profile} alt={"icon"} /> :
                        <Profile src={"/img/defaultUserProfile.png"} alt="icon"/>
                    }
                    <UserContainer>
                        <p>{value.user}</p>
                        <p>{newDate}</p>
                    </UserContainer>
                </ProfileContainer>
                <ContentContainer>
                    <Content>
                        <LinesEllipsis
                            text={value.title}
                            ellipsis={"..."}
                            line={"1"}
                            trimRight
                            basedOn={"letters"}
                            component={"p"}
                        />
                        <LinesEllipsis
                            text={value.content}
                            ellipsis={"..."}
                            maxLine={"4"}
                            trimRight
                            basedOn={"letters"}
                            component={"p"}
                        />
                    </Content>
                </ContentContainer>
            </div>
            {value.filePath && <img className={"content-img"} src={`http://${value.filePath}`} alt={"icon"} />}
        </Root>
    )
}

const Root = styled(Link)`
  overflow: hidden;
  margin-bottom: 30px;
  width: 500px;
  height: 200px;
  display: flex;
  position: relative;
  cursor: pointer;
  .content-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    right: 0;
    position: absolute;
  }
  text-decoration: none;
  color: black;
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
  p{
    width: 320px;
  }
`