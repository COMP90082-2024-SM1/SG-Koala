import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import NavbarLayout from "./components/NavbarLayout/NavbarLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Database from "./pages/Database";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import NewBooking from "./pages/NewBooking";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarLayout>
          <div className="navbar">
            <Navbar />
          </div>
        </NavbarLayout>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/database" element={<Database />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/:id" element={<TemplateDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/new-booking" element={<NewBooking isNew={true} />} />
            <Route path="/new-booking/:bookingId" element={<NewBooking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
