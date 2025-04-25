import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CalendarComponent from './components/Calendar/Calendar';
import Dashboard from './components/Dashboard/Dashboard';
import Imports from "./components/Imports/Imports";
import Charts from "./components/Charts/Charts";

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line} from "react-chartjs-2";

function App() {
  // Fetch Data from Flask
  const [data1, setData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/test").then(
      res => res.json()
    ).then(
      data1 => {
        setData(data1)
      }
    )
  }, [])

  return (
    
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar /> 

        <div style={{ marginLeft: "250px", flex: 1 }}>
          <Navbar />         
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/calendar" element={<CalendarComponent />} /> 
            <Route path="/imports" element={<Imports />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
