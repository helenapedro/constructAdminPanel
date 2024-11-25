import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './App.module.css';

import Wrapper from './components/wrapper';
import Main from './components/main';
import NavBar from './pages/NavBar/NavBar';
import Home from './pages/Home/Home';
import ProjectsContainer from './pages/projects/ProjectContainer';
import ProjectDetails from './components/ProjectDetails';
import Certificate from './pages/Certificate/Certificate';
import NotFound from './pages/NotFound';
import Footer from './components/Footer/Footer';
import AboutContainer from './pages/About/AboutContainer';

const App = () => {
  return (
    <Router>
      <Wrapper>
        <NavBar />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsContainer />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/education" element={<Certificate />} />
            <Route path="/about" element={<AboutContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;
