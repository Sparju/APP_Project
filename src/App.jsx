
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MainUi from './components/interface/MainUi';
import RouterConfig from './Router';
import { login, logout } from './services/Action.js/ActionIndex';
import './Style.scss';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    console.log("User logged in:", isLoggedIn);
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <Container className='mainpage'>
      <Row className='fixedHeader' >
        {isLoggedIn && <MainUi />}
      </Row>
      <body id='bdy'>
      <RouterConfig />
      </body>
        
      
      <Row className='Footer'>
        {isLoggedIn && <Footer />}
      </Row>
    </Container>
  );
};

export default App;
