import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import HighScore from './components/highScore/highScore';
import Game from './components/game/game';
import Instructions from './components/instructions/instructions';
import { useSelector } from 'react-redux';
import Header from './components/header/header';
import './app.scss'
import Endgame from './components/endgame/endgame';
import Home from './components/home/home';

const App = () => {


  const user = useSelector((state) => state.auth.user);
  




  return (
   


      <BrowserRouter>
        {user && <Header/>}
   
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/game' element={<Game />} />
          <Route path='/highScore' element={<HighScore />} />
          <Route path='/instructions' element={<Instructions />} />
          <Route path='/endgame' element={<Endgame/>}/>
        </Routes>
      </BrowserRouter>



  );
};

export default App;
