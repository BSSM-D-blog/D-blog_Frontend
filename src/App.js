import './styles/App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { WritePage, MainPage, LoginPage, RegisterPage, ReadPage } from './allFiles';

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
