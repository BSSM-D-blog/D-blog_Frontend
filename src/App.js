import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import WritePage from "./views/afterLogin/board/writePage";
import MainPage from "./views/mainPage";
import LoginPage from "./views/beforeLogin/auth/loginPage";
import RegisterPage from "./views/beforeLogin/auth/registerPage";
import ReadPage from "./views/afterLogin/board/readPage";
import Forbidden from "./views/beforeLogin/forbidden";
import {instance} from "./util/axiosSetting";

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
    return instance.get("/api/user")
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
