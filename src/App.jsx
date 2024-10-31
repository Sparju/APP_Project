
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MainUi from './components/interface/MainUi';
import RouterConfig from './Router';
import { login, logout } from './services/Action.js/ActionIndex';


const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User logged in:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      {isLoggedIn && <MainUi />} 
      <Row>
        <RouterConfig />
      </Row>
    </Container>
  );
};

export default App;
