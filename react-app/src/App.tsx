import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';

function App() {
  const [login, setLogin] = useState(localStorage.getItem('token') != null ? true : false);

  useEffect(() => {
    loginHandler()
    window.process = { ...window.process, }
  }, []);

  const loginHandler = () => {
    const token = localStorage.getItem('token');
    token && setLogin(true)
  }

  const logout = () => {
    localStorage.clear()
    setLogin(false)
  }

  return (
    <div className="main-wrapper">
      <ToastContainer />
      <Header logoutHandler={logout as Function} isLogin={login} />
      <Container>
        {
          login ?
            <>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Navigate replace to="/home" />} />
              </Routes>
            </>
            :
            <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/login" element={login ? (<Navigate replace to="/profile" />) : (<Login signInSuccess={loginHandler} />)} />
              <Route path="/signup" element={login ? (<Navigate replace to="/profile" />) : (<Signup signInSuccess={loginHandler} />)} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        }
      </Container>
    </div>
  );
}

export default App;
