import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const trailIdRef = useRef(0);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    onScoreChange(0);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      const lastSegment = prevSnake[prevSnake.length - 1];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => {
          const newScore = s + 10;
          onScoreChange(newScore);
          return newScore;
        });
        generateFood();
      } else {
        newSnake.pop();
        // Add to trail when a segment is removed
        setTrail((prevTrail) => [
          { ...lastSegment, id: trailIdRef.current++ },
          ...prevTrail.slice(0, 12),
        ]);
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, generateFood, onScoreChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 80);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <div className="relative w-full aspect-square bg-slate-900 border-2 border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-cyan-500/20" />
        ))}
      </div>

      {/* Trail */}
      {trail.map((segment, i) => (
        <div
          key={segment.id}
          className="absolute bg-[#00ffff]/20 blur-[3px] rounded-none"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(segment.x * 100) / GRID_SIZE}%`,
            top: `${(segment.y * 100) / GRID_SIZE}%`,
            opacity: 1 - i / trail.length,
          }}
        />
      ))}

      {/* Snake */}
      {snake.map((segment, i) => (
        <div
          key={i}
          className="absolute bg-[#00ffff] shadow-[0_0_15px_#00ffff] rounded-none z-10"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(segment.x * 100) / GRID_SIZE}%`,
            top: `${(segment.y * 100) / GRID_SIZE}%`,
            opacity: 1 - i / (snake.length + 2),
          }}
        />
      ))}

      {/* Food */}
      <div
        className="absolute bg-[#ff00ff] shadow-[0_0_15px_#ff00ff] rounded-none animate-pulse"
        style={{
          width: `${100 / GRID_SIZE}%`,
          height: `${100 / GRID_SIZE}%`,
          left: `${(food.x * 100) / GRID_SIZE}%`,
          top: `${(food.y * 100) / GRID_SIZE}%`,
        }}
      />

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 bg-[#000]/90 flex flex-col items-center justify-center backdrop-blur-md border-4 border-[#ff00ff]">
          <h2 className="text-3xl font-pixel text-[#ff00ff] mb-4 glitch-text">SYSTEM_FAILURE</h2>
          <p className="text-[#00ffff] mb-6 font-pixel text-xs">DATA_LOST: {score}</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-[#00ffff] text-[#000] font-pixel text-xs hover:bg-[#ff00ff] transition-colors shadow-[4px_4px_0_#ff00ff]"
          >
            REBOOT
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
