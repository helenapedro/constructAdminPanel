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
import Login from "./components/auth/Login";

const App = () => {
  return (
    <Router>
      <Wrapper>
        <NavBar />
        <Main>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={<ProtectedRoute element={<ProjectsContainer />} />}
            />
            <Route
              path="/projects/:id"
              element={<ProtectedRoute element={<ProjectDetailsCard />} />}
            />
            <Route
              path="/education"
              element={<ProtectedRoute element={<Certificate />} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute element={<AboutContainer />} />}
            />

            {/* Fallback Route */}
            <Route
              path="*"
              element={<ProtectedRoute element={<NotFound />} />}
            />
          </Routes>
        </Main>
      </Wrapper>
    </Router>
  );
};

export default App;
