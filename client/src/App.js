
import './App.css';
import React from 'react'
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [vgName, setName] = useState("");
  const [vgYear, setYear] = useState(0);
  const [vgGenre, setGenre] = useState("");
  const [vgSysID, setSysID] = useState(0);
  const [vgRating, setRating] = useState("");
  const [vgPrice, setPrice] = useState(0);
  const [vgPublID, setPublID] = useState(0);
  const [vgSKU, setSKU] = useState("");


  const addGame = () => {
    Axios.post('http://localhost:3001/create', {
      vgName: vgName,
      vgYear: vgYear,
      vgGenre: vgGenre,
      vgSysID: vgSysID,
      vgRating: vgRating,
      vgPrice: vgPrice,
      vgPublID: vgPublID,
      vgSKU: vgSKU
    }).then(() => {
        console.log("success");
    })
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

      <label>Genre: </label>
      <input 
      type="text" 
      onChange={(event) => {
        setGenre(event.target.value);}}/>
      
      <label>System ID: </label>
      <input 
      type="number"
      onChange={(event) => {
        setSysID(event.target.value);}}/>
      
      <label>Rating: </label>
      <input 
      type="text" 
      onChange={(event) => {
        setRating(event.target.value);}}/>

      <label>Price: </label>
      <input 
      type="number" 
      onChange={(event) => {
        setPrice(event.target.value);}}/>

      <label>publisherID: </label>
      <input 
      type="number" 
      onChange={(event) => {
        setPublID(event.target.value);}}/>

      <label>SKU: </label>
      <input 
      type="text" 
      onChange={(event) => {
        setSKU(event.target.value);}}/>
      <button onClick={addGame}>Add</button>
      </div>
    </div>
  );
}

export default App;
