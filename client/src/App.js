import './App.css';
import React from 'react'
import Nav from './components/Nav';
import Home from './components/Home';
import Inventory from './components/Inventory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/inventory" exact element={<Inventory />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
