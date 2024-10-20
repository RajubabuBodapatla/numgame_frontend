import React from 'react';
import './instructions.scss';

const Instructions = () => {
  return (
    <div className="instructions-container">
     
      <h3>Gameplay:</h3>
      <ol>
        <li>You will be shown a <strong>Target Number</strong> at the start of each question.</li>
        <li>Below the target, you'll see a set of numbers (the <strong>Pool</strong>).</li>
        <li>Select numbers from the pool by clicking on them to try and reach the target sum.</li>
        <li>Each number you select will be added to the current sum, and you'll see the sum update live as:
          <br/><em>1, then 1 + 5, then 1 + 5 + 2, and so on...</em></li>
        <li>If you match the target, you'll see <strong>"= target"</strong> and move to the next question after a short delay.</li>
        <li>If your sum exceeds the target, you'll see <strong>"= exceeded"</strong> in red, and you'll move to the next question after a short delay.</li>
      </ol>

      <h3>Difficulty Levels:</h3>
      <p>The game consists of 3 difficulty levels:</p>
      <ul>
        <li><strong>Easy:</strong> You will select from smaller numbers and need to reach smaller target sums.</li>
        <li><strong>Medium:</strong> The numbers are larger, and the target sums are more challenging.</li>
        <li><strong>Hard:</strong> The numbers and target sums are even more difficult to reach.</li>
      </ul>
      <p>You need to answer at least <strong>3 questions correctly</strong> at each level to move on to the next.</p>

      <h3>Scoring:</h3>
      <ul>
        <li><strong>Easy:</strong> 5 points per correct answer</li>
        <li><strong>Medium:</strong> 10 points per correct answer</li>
        <li><strong>Hard:</strong> 20 points per correct answer</li>
      </ul>

      <p>Your total score will be tracked, and your highest score will be saved!</p>
      
      <h3>Game Over:</h3>
      <p>The game ends after completing the hard level or failing to meet the minimum requirements. Your final score will be displayed.</p>
      
      <h4>Good luck and have fun!</h4>
    </div>
  );
};

export default Instructions;
