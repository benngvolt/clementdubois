import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import OneProject from './pages/OneProject/OneProject';
import About from './pages/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AllProjects from './pages/AllProjects/AllProjects';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProjectsProvider } from './utils/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <Router>
      <ProjectsProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects" element={<AllProjects/>} />
            <Route path="/projects/:id" element={<OneProject/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/edit" element={<Edit/>} />
          </Routes>
        <Footer/>
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
