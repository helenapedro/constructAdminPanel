import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.module.css";

import Wrapper from "./components/wrapper";
import Main from "./components/main";
import NavBar from "./pages/NavBar/NavBar";
import ProjectsContainer from "./pages/projects/ProjectContainer";
import ProjectDetailsCard from "./components/ProjectDetailsCard";
import Certificate from "./pages/Certificate/Certificate";
import NotFound from "./pages/NotFound";
import AboutContainer from "./pages/About/AboutContainer";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Wrapper>
        <NavBar />
        <Main>
          <Routes>
            <Route path="/" element={<ProjectsContainer />} />
            <Route path="/projects/:id" element={<ProjectDetailsCard />} />
            
            {/* Protect the /education route */}
            <Route
              path="/education"
              element={<ProtectedRoute element={<Certificate />} />}
            />
            
            {/* Protect the /about route */}
            <Route
              path="/about"
              element={<ProtectedRoute element={<AboutContainer />} />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </Wrapper>
    </Router>
  );
};

export default App;
