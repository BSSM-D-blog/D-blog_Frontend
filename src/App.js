import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { WritePage, MainPage, LoginPage, RegisterPage, ReadPage,Forbidden } from './allFiles';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const userinfo = {
  id: 0,
  nickname: "",
  created: "",
  role: "",
  profile: "",    
  isLogin: false,
}

export const UserContext = createContext(userinfo);

function App() {

  const [user, setUser] = useState(userinfo)

  useEffect(()=>{
    (async()=>{
      try{
        setUser({
          ...(await getUser()).data,
          isLogin: true,
        })
        console.log(user);
      }catch(error){
        setUser((prev)=>({
          ...prev,
          isLogin: false,
        }))
        console.log(error);
      }
    })();
  }, []);

  const getUser = () => {
    return axios.get("/api/user", {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    })
  }

  return (
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path = "/write" element={<WritePage/>}/>
            <Route path = "/" element={<MainPage/>}/>
            <Route path = "/login" element={<LoginPage/>}/>
            <Route path = "/register" element={<RegisterPage/>}/>
            <Route path = "/read" element={<ReadPage/>}/>
            <Route path={"/forbidden"} element={<Forbidden/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
