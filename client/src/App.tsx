import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, } from 'react-router-dom';
import GamePage from './components/gamePage/gamePage';
import BestPlayers from './components/bestPlayers/bestPlayers';
import Test from './components/test';
import CapitalLanding from './components/capitalGame/landing/landing';
import BestCapitalPlayers from './components/capitalGame/bestPlayers/bestPlayersCapitals';


function App(): JSX.Element {
  return (
   <Routes>
    <Route path="/" element={<><GamePage/></>}/>
    <Route path = "/bestPlayers" element={<BestPlayers/>}/>
    <Route path = "/bestCapitalPlayers" element={<BestCapitalPlayers/>}/>
    <Route path = "/test" element={<Test/>}/>
    <Route path = "/capitals" element={<CapitalLanding/>}/>
   </Routes>
  );
}

export default App;
