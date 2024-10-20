// ScoreAnimation.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreAnimation = ({ score, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            fontSize: '100px',
            color: "#3cb043",
            opacity: 0.7
          }}
        >
          +{score}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScoreAnimation;
