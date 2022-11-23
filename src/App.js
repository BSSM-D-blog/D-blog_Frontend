import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { WritePage, MainPage, LoginPage, RegisterPage, ReadPage,Forbidden } from './allFiles';
import { createContext, useEffect, useState } from 'react';
import {instance} from "./util/instance";

const userinfo = {
  id: 0,
  nickname: "",
  created: "",
  role: "",
  profile: "",    
  isLogin: false,
}

export const userContext = createContext(userinfo);

function App() {

  const [user, setUser] = useState(userinfo)

  useEffect(()=>{
    (async()=>{
      try{
        setUser({
          ...(await getUser()).data,
          isLogin: true,
        })
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
    return instance.get("/api/user");
  }

  return (
      <BrowserRouter>
        <userContext.Provider value={user}>
          <Routes>
            <Route path = "/write" element={<WritePage/>}/>
            <Route path = "/" element={<MainPage/>}/>
            <Route path = "/login" element={<LoginPage/>}/>
            <Route path = "/register" element={<RegisterPage/>}/>
            <Route path = "/read" element={<ReadPage/>}/>
            <Route path={"/forbidden"} element={<Forbidden/>}/>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
  );
}

export default App;
