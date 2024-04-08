import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavgationBar/Navbar';
import './App.css';


import Dashboard from './pages/Dashboard';
import Database from './pages/Database';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';


import {
  TypographyH1,
  TypographyH2,
  TypographyParagraph,
} from './components/Typography/Typography';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
            <NavigationBar />
          </div>
        <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/database" element={<Database />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/typography" element={
            <div>
              <TypographyH1 style={{ color: "blue" }}>This is an H1 Header</TypographyH1>
              <TypographyH2>This is an H2 Header</TypographyH2>
              <TypographyParagraph>This is a paragraph</TypographyParagraph>
            </div>
          } />
        </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;

