import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import WritePage from './views/writePage';
import MainPage from './views/mainPage';
import LoginPage from './views/loginPage';
import RegisterPage from './views/registerPage';
import ReadPage from './views/readPage';

function App() {
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
