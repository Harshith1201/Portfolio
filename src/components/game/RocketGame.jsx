import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/rocketgame.css';

const RocketGame = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('rocketGameHighScore') || 0);

  // Game objects
  const gameObjects = useRef({
    rocket: { x: 50, y: 200, width: 40, height: 30, dy: 0 },
    obstacles: [],
    stars: [],
    lastObstacle: 0,
    lastStar: 0,
    gameSpeed: 2
  });

  const GRAVITY = 0.5;
  const JUMP_FORCE = -12;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 300;

  // Initialize game
  const initGame = useCallback(() => {
    const objects = gameObjects.current;
    objects.rocket = { x: 50, y: 200, width: 40, height: 30, dy: 0 };
    objects.obstacles = [];
    objects.stars = [];
    objects.lastObstacle = 0;
    objects.lastStar = 0;
    objects.gameSpeed = 2;
    setScore(0);
  }, []);

  // Handle jump
  const jump = useCallback(() => {
    if (gameState === 'waiting') {
      setGameState('playing');
      initGame();
    }
    if (gameState === 'playing') {
      gameObjects.current.rocket.dy = JUMP_FORCE;
    }
    if (gameState === 'gameOver') {
      setGameState('waiting');
      initGame();
    }
  }, [gameState, initGame, JUMP_FORCE]);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const objects = gameObjects.current;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState === 'waiting') {
      // Draw start screen
      ctx.fillStyle = '#fff';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🚀 ROCKET RUNNER 🚀', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50);
      ctx.font = '16px Arial';
      ctx.fillText('Press SPACE or Click to Start!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
      return;
    }

    if (gameState === 'gameOver') {
      // Draw game over screen
      ctx.fillStyle = '#ff4444';
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50);
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${score}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 25);
      ctx.fillText('Press SPACE or Click to Restart!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50);
      return;
    }

    // Update rocket physics
    objects.rocket.dy += GRAVITY;
    objects.rocket.y += objects.rocket.dy;

    // Keep rocket in bounds
    if (objects.rocket.y < 0) {
      objects.rocket.y = 0;
      objects.rocket.dy = 0;
    }
    if (objects.rocket.y > CANVAS_HEIGHT - objects.rocket.height) {
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('rocketGameHighScore', score);
      }
      return;
    }

    // Spawn obstacles
    if (Date.now() - objects.lastObstacle > 2000) {
      objects.obstacles.push({
        x: CANVAS_WIDTH,
        y: Math.random() * (CANVAS_HEIGHT - 100) + 50,
        width: 20,
        height: 60
      });
      objects.lastObstacle = Date.now();
    }

    // Spawn stars (collectibles)
    if (Date.now() - objects.lastStar > 3000) {
      objects.stars.push({
        x: CANVAS_WIDTH,
        y: Math.random() * (CANVAS_HEIGHT - 100) + 50,
        width: 15,
        height: 15
      });
      objects.lastStar = Date.now();
    }

    // Update obstacles
    objects.obstacles = objects.obstacles.filter(obstacle => {
      obstacle.x -= objects.gameSpeed;
      return obstacle.x > -obstacle.width;
    });

    // Update stars
    objects.stars = objects.stars.filter(star => {
      star.x -= objects.gameSpeed;
      return star.x > -star.width;
    });

    // Check collisions with obstacles
    objects.obstacles.forEach(obstacle => {
      if (objects.rocket.x < obstacle.x + obstacle.width &&
          objects.rocket.x + objects.rocket.width > obstacle.x &&
          objects.rocket.y < obstacle.y + obstacle.height &&
          objects.rocket.y + objects.rocket.height > obstacle.y) {
        setGameState('gameOver');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('rocketGameHighScore', score);
        }
      }
    });

    // Check collisions with stars
    objects.stars = objects.stars.filter(star => {
      if (objects.rocket.x < star.x + star.width &&
          objects.rocket.x + objects.rocket.width > star.x &&
          objects.rocket.y < star.y + star.height &&
          objects.rocket.y + objects.rocket.height > star.y) {
        setScore(prev => prev + 10);
        return false;
      }
      return true;
    });

    // Draw rocket
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(objects.rocket.x, objects.rocket.y, objects.rocket.width, objects.rocket.height);
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('🚀', objects.rocket.x + 5, objects.rocket.y + 20);

    // Draw obstacles
    ctx.fillStyle = '#ff4444';
    objects.obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw stars
    ctx.fillStyle = '#ffd700';
    objects.stars.forEach(star => {
      ctx.font = '15px Arial';
      ctx.fillText('⭐', star.x, star.y + 12);
    });

    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 30);

    // Increase game speed gradually
    objects.gameSpeed += 0.001;

  }, [gameState, score, highScore]);

  // Set up event listeners
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyPress);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, [jump]);

  // Game loop
  useEffect(() => {
    gameLoopRef.current = setInterval(gameLoop, 1000/60); // 60 FPS
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  return (
    <div className="rocket-game-container">
      <h3>🚀 Rocket Runner</h3>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="game-canvas"
      />
      <div className="game-instructions">
        <p>🎮 Use SPACE or CLICK to jump and avoid obstacles!</p>
        <p>⭐ Collect stars for bonus points!</p>
      </div>
    </div>
  );
};

export default RocketGame;
