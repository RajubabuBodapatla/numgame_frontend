import React from 'react'

import end_ani from '../../animations/endgame-ani.json'
import Lottie from 'lottie-react';
import './endgame.scss'
import { useLocation } from 'react-router-dom';

const Endgame = () => {
    const location = useLocation();
    const {score} = location.state || {};

  return (
    <div className='end-div'>
      <p>Congrats You completed Game, Your Score is </p>
      <span className='endgame-span'>{score}</span>
      <Lottie className='end-ani' animationData={end_ani}/>
    </div>
  )
}

export default Endgame
