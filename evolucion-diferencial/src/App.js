import React from 'react';
import './App.css';
import { ParamsContextProvider } from './context/ParamsContext';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home';

function App() {
  return (
    <>
    <ParamsContextProvider>
      <div>
          <Router>
            <Routes>
              <Route path='/' Component={Home}/>
            </Routes>
          </Router>
      </div>
    </ParamsContextProvider> 
    </> 
  );
}

export default App;
