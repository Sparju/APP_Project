import { Container, Row } from "react-bootstrap"

import { Routes, Route } from "react-router-dom"
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/interface/interface";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/headerComp/About";
import Contact from "./components/headerComp/Contact";
import Admin from "./components/Admin";


const App = () => {
  return (

    <Container>

      <Row>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/home" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Row>
    </Container>
  )
}
export default App;