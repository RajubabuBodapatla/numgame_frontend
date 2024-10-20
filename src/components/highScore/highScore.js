import React,{useState,useEffect} from 'react'
import './highScore.scss';
import axios from 'axios'
import {OrbitProgress} from 'react-loading-indicators'




const HighScore = () => {

        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);

      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await axios.get('https://numgame-backend.onrender.com/auth/users');
              const sortedUsers = res.data.sort((a, b) => b.highestScore - a.highestScore); // Make sure it's 'highestscore'
              setUsers(sortedUsers);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
      
          fetchData();
        }, []); 

  return (
    loading?(<div style={{marginTop:'100px'}}><OrbitProgress color="#ffbf00" size="small" text="" textColor="" /></div>)

    :(<div className='leaderBoard-div'>
      {/* <img className='leader-logo' src={leaderlogo} alt='leaderboard-logo'/> */}
       
      <div className='leaderBoard'>
      <h1>Leader Board</h1>
         {users.map((user,index) => (
      <div className='userName-l' key={user.id}>
        <span>{user.username}</span><span>{index === 0 && <i class="fa-solid fa-trophy" ></i> }{user.highestScore}</span> 
      </div>
    ))}
        
      </div>
  </div>)
  )
}

export default HighScore
