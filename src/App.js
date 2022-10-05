import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import WritePage from './views/writePage';
import MainPage from './views/mainPage';
import LoginPage from './views/loginPage';
import RegisterPage from './views/registerPage';
import ReadPage from './views/readPage';
import { useEffect, useState } from 'react';
import { instance } from './instance';
import axios from 'axios';

function App() {

  const [useinfo, setUserinfo] = useState({
    id: 0,
    nickname: "",
    created: "",
    role: "",
    profile: "",    
    isLogin: false,
  })

  useEffect(()=>{
    (async()=>{
      try{
        setUserinfo({
          ...(await getUser()).data,
          isLogin: true,
        })
      }catch(error){
        setUserinfo((prev)=>({
          ...prev,
          isLogin: false,
        }))
        console.log(error);
      }
    })();
  }, []);

  const getUser = () => {
    return axios.get("/api/user", { headers: { Authorization: localStorage.getItem('accessToken')}});
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/write" element={<WritePage/>}/>
          <Route path = "/" element={<MainPage/>}/>
          <Route path = "/login" element={<LoginPage/>}/>
          <Route path = "/register" element={<RegisterPage/>}/>
          <Route path = "/read" element={<ReadPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
