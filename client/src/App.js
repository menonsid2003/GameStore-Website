
import './App.css';
import React from 'react'
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [vgName, setName] = useState("");
  const [vgYear, setYear] = useState(0);
  const [vgSysID, setSysID] = useState(0);
  const [vgSKU, setSKU] = useState(0);

  const addGame = () => {
    Axios.post('http://localhost:3001/create', {
      vgName: vgName,
      vgYear: vgYear,
      vgSysID: vgSysID,
      vgSKU: vgSKU
    }).then(() => {
        console.log("success");
    })
  };

  const displayInfo = () => {
    console.log(vgName + vgYear + vgSysID + vgSKU);
  };

  return (
    <div className="App">
      <div className="Information">
      <label>Name: </label>
      <input 
      type="text" 
      onChange={(event) => {
        setName(event.target.value);}}/>
      <label>Year: </label>
      <input 
      type="number"
      onChange={(event) => {
        setYear(event.target.value);}}/>
      <label>System ID: </label>
      <input 
      type="number"
      onChange={(event) => {
        setSysID(event.target.value);}}/>
      <label>SKU: </label>
      <input 
      type="number" 
      onChange={(event) => {
        setSKU(event.target.value);}}/>
      <button onClick={addGame}>Add</button>
      </div>
    </div>
  );
}

export default App;
