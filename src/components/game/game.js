import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './game.scss';
import { useNavigate } from 'react-router-dom';
import ScoreAnimation from '../scoreAnimation';

const generateUniqueNumbers = (min, max, count) => {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(uniqueNumbers);
};

const generateValidPoolAndTarget = (min, max, count, minTarget, maxTarget) => {
  let pool, target, isValid = false;

  while (!isValid) {
    pool = generateUniqueNumbers(min, max, count);
    const sum = pool.reduce((acc, num) => acc + num, 0);
    target = Math.floor(Math.random() * (Math.min(sum, maxTarget) - minTarget + 1)) + minTarget;

    const canAchieveTarget = (target, numbers) => {
      const dp = new Array(target + 1).fill(false);
      dp[0] = true;

      for (const num of numbers) {
        for (let i = target; i >= num; i--) {
          dp[i] = dp[i] || dp[i - num];
        }
      }
      return dp[target];
    };

    isValid = canAchieveTarget(target, pool);
  }

  return { pool, target };
};

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [target, setTarget] = useState(1);
  const [pool, setPool] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [sumExpression, setSumExpression] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [clicked, setClicked] = useState({});
  const user = useSelector((state) => state.auth.user);
  const [isVisible,setIsVisible] = useState(false);
  const [anipoints,setAnipoints] = useState(0);
  const [showlevel,setShowlevel] = useState(false);
  const [startingScore, setStartingScore] = useState(0);

  const userId = user?.id;
  const navigate = useNavigate()

  const questionsPerLevel = 5;

  const difficultySettings = {
    easy: { poolSize: 5, maxNumber: 10, minTarget: 10, maxTarget: 20, scorePerCorrect: 5 },
    medium: { poolSize: 7, maxNumber: 20, minTarget: 20, maxTarget: 50, scorePerCorrect: 10 },
    hard: { poolSize: 10, maxNumber: 50, minTarget: 50, maxTarget: 100, scorePerCorrect: 20 },
  };


  useEffect(()=>{
    startNewQuestion()
  },[])

  useEffect(() => {
   
    startNewQuestion();
    
  }, [currentQuestion]);

  const startNewQuestion = () => {
    const { poolSize, maxNumber, minTarget, maxTarget } = difficultySettings[getCurrentDifficulty()];
    const { pool: newPool, target: newTarget } = generateValidPoolAndTarget(1, maxNumber, poolSize, minTarget, maxTarget);

    setPool(newPool);
    setTarget(newTarget);
    setSelectedNumbers([]);
    setCurrentSum(0);
    setSumExpression('');
    setMessage('');
    setClicked({});
  };

  const getCurrentDifficulty = () => {
    if (currentQuestion <= questionsPerLevel) return 'easy';
    if (currentQuestion <= 2 * questionsPerLevel) return 'medium';
    return 'hard';
  };

  const handleNumberClick = (number, index) => {
    if (!selectedNumbers.includes(number)) {
      const newSelectedNumbers = [...selectedNumbers, number];
      const newSum = newSelectedNumbers.reduce((acc, num) => acc + num, 0);
      const newSumExpression = newSelectedNumbers.join(' + ');
      setSelectedNumbers(newSelectedNumbers);
      setCurrentSum(newSum);
      setSumExpression(newSumExpression);
      setClicked((previousState) => ({ ...previousState, [index]: true }));
    }
  };


  useEffect(() => {
    if (currentSum === target) {
      setMessage('Success! You reached the target.');
      setSumExpression((prev) => prev + ' = ' + target);
      setAnipoints( difficultySettings[getCurrentDifficulty()].scorePerCorrect);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 1000);
    

      setTimeout(() => {
        handleNextQuestion(true);  
      }, 1500);
    } else if (currentSum > target) {
      setMessage('Sum exceeded. Moving to next question.');
      setSumExpression((prev) => prev + ' = exceeded');
      setTimeout(() => {
        handleNextQuestion(false); 
      }, 1500);
    }
  }, [currentSum]);

  const handleNextQuestion = () => {
    const isCorrect = currentSum === target;
    const points = difficultySettings[getCurrentDifficulty()].scorePerCorrect;
  
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + points);
    }
  
    const currentLevel = Math.ceil(currentQuestion / questionsPerLevel);
    const questionInLevel = currentQuestion % questionsPerLevel || questionsPerLevel;
  
    // Move to next level only if 3 or more correct answers
    if (questionInLevel === questionsPerLevel) {
      if (correctCount + (isCorrect ? 1 : 0) >= 3 || currentLevel === 3) {
        if (currentLevel === 3) {
          handleEndOfGame();
        } else {
          // Before advancing to the next level, store the current score
          setStartingScore(score);
          setCurrentQuestion(prev => prev + 1);
          setCorrectCount(0);
        }
      } else {
        // Reset the score to the starting score if retrying the level
        setMessage('Not enough correct answers. Retrying the level...');
        setScore(startingScore);  // Reset score to the starting point of the level
        setCorrectCount(0);
        setCurrentQuestion((currentLevel - 1) * questionsPerLevel + 1);  // Restart the current level
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  

  useEffect(()=>{
  if(getCurrentDifficulty()!== 'easy'){
    setShowlevel(true);

  }
   
    setTimeout(()=>{
      setShowlevel(false)
    },3000)

  },[getCurrentDifficulty()])
  


  const handleEndOfGame = async () => {
    navigate('/endgame',{state:{score:score}})
    try {
      const users = await fetchUsers();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        const user = users[userIndex];
        user.score = score;

        if (user.score > user.highestScore) {
          user.highestScore = user.score;
        }

        await updateUserScore(user.id, { score: user.score, highestScore: user.highestScore });
      }
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch('https://numgame-backend.onrender.com/auth/users');
    return response.json();
  };

  const updateUserScore = async (userId, scoreData) => {
    await fetch(`https://numgame-backend.onrender.com/auth/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    });
  };

  return (
   

<div className='game-div'>
      <div className='level-div'>
        <p>Current Level: <span>{getCurrentDifficulty()}</span></p>
        <p>Current Question: <span>{currentQuestion}/15</span></p>
        <p>Score:<span>{score}</span> </p>
      </div>

      <p>Target: {target}</p>
      {showlevel && <h3>Yay, You moved to <span className='difficulty'>{getCurrentDifficulty()}</span> level</h3>}
      <h3>Select numbers from the pool</h3>
      <div className='num-div'>
        {pool.map((num, index) => (
          <button
            style={{ backgroundColor: clicked[index] ? 'lightgreen' : '' }}
            className='num'
            key={index}
            onClick={() => handleNumberClick(num, index)}
          >
            {num}
          </button>
        ))}
      </div>

      <h1>
        <span>Sum:</span> {sumExpression && (
          <span style={{ color: currentSum > target ? 'red' : 'green' }}>{sumExpression}</span>
        )}
      </h1>

      <h3>&nbsp;{message}</h3>
      <ScoreAnimation score={anipoints} isVisible={isVisible} />
      <div className='note'>
        <p><span >Note : </span>Don't Navigate to other Pages without Completing the Game, As it will reset the Game.</p>

      </div>

      
    </div>

  );
};

export default Game;
