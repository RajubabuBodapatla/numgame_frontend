import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import highscorelogo from '../../Assets/sum-highscore.png';
import profilelogo from '../../Assets/sum-profile.png';
import gamelogo from '../../Assets/sum-game.png';
import './home.scss';
import anichar from '../../Assets/image.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const user = useSelector((state) => state.auth.user);
  const userName = user?.username;
  const highScore = user?.highestScore;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://numgame-backend.onrender.com/auth/users');
        const sortedUsers = res.data.sort((a, b) => b.highestScore - a.highestScore); // Make sure it's 'highestscore'
        setUsers(sortedUsers);
        console.log(sortedUsers); // Sorted users array
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handlescore = () => {
    navigate('/highscore');

  }
  const handlegame = () => {
    navigate('/game');

  }

  return (
    <div className='homedivapp'>
      <div className='home-div'>
        <div className='profile-div tab'>
          <img src={profilelogo} alt='profileLogo' />
          <p>User : <span className='rightspan'>{user ? userName : '--'} </span></p>
          <p>HighScore : <span className='rightspan'>{user ? highScore : '--'}</span></p>
          <img className='anichar' src={anichar} alt='animatedchar' />

        </div>

        <div className='second-div'>
          <div className='highScore-div tab' onClick={handlescore}>
            <img src={highscorelogo} alt='profileLogo' />
            {users.slice(0, 3).map((user, index) => (
              <p className='userName-l' key={user.id}>
                <span>{user.username}</span><span>{index === 0 && <i className="fa-solid fa-trophy" ></i>}<span className='rightspan'>{user.highestScore}</span></span>
              </p>

            ))}

          </div>
          <div className='gameplay-div tab' onClick={handlegame}>
            <img src={gamelogo} alt='profileLogo' />
            <p>Start Playing</p>
          </div>

        </div>

        <div className='instr-div tab'>
        <span className='rightspan'>Instuctions</span>
        <p> Objective: Click numbers from the pool to match the target sum. If the sum matches the target, you progress; if it exceeds, you move on without points.</p>
        <p>Difficulty Levels: Complete 3 questions correctly per level (Easy, Medium, Hard) to move on. Each level increases in difficulty and rewards more points.</p>
        <p>Scoring & Game Over: Earn 5, 10, and 20 points for each correct answer in Easy, Medium, and Hard levels. The game ends when you finish the Hard level or fail to progress.</p>
        <p className='rightspan'>Read full instructions in instruction PAge for more details</p>
      </div>


      </div>
      

    </div>

  )
}

export default Home
