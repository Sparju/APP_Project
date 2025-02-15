
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
import { ThemeProvider, createTheme } from "@mui/material/styles";


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
  const theme = createTheme({
    // Customize your theme here
    palette: {
        primary: {
            main: "#1976d2", // Customize primary color
        },
    },
});

  return (
    <Container className='mainpage'>
              <ThemeProvider theme={theme}>
      <Row className='fixedHeader' >
        {isLoggedIn && <MainUi />}
      </Row>
      <body id='bdy'>
        <RouterConfig />
      </body>


      {isLoggedIn &&
        <Row className='Footer'>
          <Footer />
        </Row>
      }
      </ThemeProvider>
    </Container>
  );
};

export default App;
