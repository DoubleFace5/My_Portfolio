import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCw, Gamepad2, Volume2, VolumeX, ShieldCheck, HelpCircle } from "lucide-react";

export default function GameStation() {
  const [activeGame, setActiveGame] = useState<"snake" | "bounce" | "video">("snake");
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<{ snake: number; bounce: number }>({ snake: 0, bounce: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Colors matching palette
  const COLORS = {
    clay: "#37463D",
    sand: "#E3CD8B",
    sage: "#5D7052",
    ochre: "#C18845",
    amber: "#F0BE86",
    bg: "#1a1a1a",
    card: "#2c2925",
  };

  // Synthetic bleep-bloop sounds
  const playSound = (type: "eat" | "hit" | "gameover" | "paddle") => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "eat") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "paddle") {
        osc.frequency.setValueAtTime(293.66, ctx.currentTime); // D4
        osc.frequency.exponentialRampToValueAtTime(392, ctx.currentTime + 0.05); // G4
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "hit") {
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "gameover") {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.4); // A2
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio block or mute by browser policies
    }
  };

  // --- SNAKE GAME ENGINE STATE ---
  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const snakeDirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const foodRef = useRef<{ x: number; y: number }>({ x: 15, y: 15 });
  const gridCount = 20;

  // --- BOUNCE BALL ENGINE STATE ---
  const bouncePaddleRef = useRef<number>(160); // paddle X center
  const bounceBallRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 200,
    y: 150,
    vx: 3,
    vy: -3,
  });
  const bounceBricksRef = useRef<{ x: number; y: number; width: number; height: number; active: boolean }[]>([]);

  // Local storage high scores loading
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fatma_portfolio_high_scores");
      if (stored) {
        setHighScore(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  const saveHighScore = (game: "snake" | "bounce", currentScore: number) => {
    setHighScore((prev) => {
      const updated = { ...prev, [game]: Math.max(prev[game], currentScore) };
      try {
        localStorage.setItem("fatma_portfolio_high_scores", JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  // Keyboard hooks for game steering
  useEffect(() => {
    if (activeGame === "video") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (activeGame === "snake") {
        // Prevent default browser scrolling when playing
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }

        const dir = snakeDirRef.current;
        switch (e.key) {
          case "ArrowUp":
            if (dir.y !== 1) snakeDirRef.current = { x: 0, y: -1 };
            break;
          case "ArrowDown":
            if (dir.y !== -1) snakeDirRef.current = { x: 0, y: 1 };
            break;
          case "ArrowLeft":
            if (dir.x !== 1) snakeDirRef.current = { x: -1, y: 0 };
            break;
          case "ArrowRight":
            if (dir.x !== -1) snakeDirRef.current = { x: 1, y: 0 };
            break;
        }
      } else {
        // Bounce Ball Paddle controls
        if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }
        const step = 25;
        if (e.key === "ArrowLeft") {
          bouncePaddleRef.current = Math.max(40, bouncePaddleRef.current - step);
        } else if (e.key === "ArrowRight") {
          bouncePaddleRef.current = Math.min(360, bouncePaddleRef.current + step);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, activeGame]);

  // Game Initializer helper
  const initializeGame = () => {
    setScore(0);
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (activeGame === "snake") {
      snakeRef.current = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ];
      snakeDirRef.current = { x: 1, y: 0 };
      generateFood();
    } else {
      // Bounce Ball - Setup Paddle, Ball, and 3 rows of gorgeous bricks matching our palette!
      bouncePaddleRef.current = 200 - 40; // centered
      bounceBallRef.current = {
        x: 200,
        y: 220,
        vx: (Math.random() > 0.5 ? 2.5 : -2.5) + (Math.random() - 0.5),
        vy: -3.5,
      };

      const bricks = [];
      const rows = 3;
      const cols = 6;
      const brickWidth = 55;
      const brickHeight = 15;
      const startX = 25;
      const startY = 40;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: startX + c * (brickWidth + 5),
            y: startY + r * (brickHeight + 5),
            width: brickWidth,
            height: brickHeight,
            active: true,
          });
        }
      }
      bounceBricksRef.current = bricks;
    }
    setGameState("playing");
  };

  const generateFood = () => {
    let newX, newY;
    do {
      newX = Math.floor(Math.random() * gridCount);
      newY = Math.floor(Math.random() * gridCount);
    } while (snakeRef.current.some((part) => part.x === newX && part.y === newY));
    foodRef.current = { x: newX, y: newY };
  };

  // Main Canvas Rendering & Tick Loop
  useEffect(() => {
    if (activeGame === "video") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameCount = 0;
    const tickRate = activeGame === "snake" ? 10 : 60; // faster tick rate for dynamic ball speed, slower for key grid snake

    const render = () => {
      // Clear/draw workspace background
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render outer decorative grid lines for retro arcade look
      ctx.strokeStyle = "rgba(106, 100, 90, 0.04)";
      ctx.lineWidth = 1;
      const lineStep = 20;
      for (let x = 0; x < canvas.width; x += lineStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += lineStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (activeGame === "snake") {
        // --- SNAKE RENDER & STEP ---
        frameCount++;
        if (gameState === "playing" && frameCount % 8 === 0) {
          // STEP SNAKE EVERY 8 FRAMES (around 120ms at 60fps)
          const snake = [...snakeRef.current];
          const dir = snakeDirRef.current;
          const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

          // Wall collide or Wrap
          if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
            playSound("gameover");
            setGameState("gameover");
            saveHighScore("snake", snake.length - 3);
          } else if (snake.slice(1).some((part) => part.x === head.x && part.y === head.y)) {
            // Tail collide
            playSound("gameover");
            setGameState("gameover");
            saveHighScore("snake", snake.length - 3);
          } else {
            // Move block forward
            snake.unshift(head);
            // Check food eat
            if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
              playSound("eat");
              setScore((s) => s + 10);
              generateFood();
            } else {
              snake.pop();
            }
            snakeRef.current = snake;
          }
        }

        // Draw Food
        ctx.fillStyle = COLORS.ochre;
        ctx.beginPath();
        const rSnake = canvas.width / gridCount;
        ctx.arc(
          foodRef.current.x * rSnake + rSnake / 2,
          foodRef.current.y * rSnake + rSnake / 2,
          rSnake / 2 - 2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw Snake
        snakeRef.current.forEach((part, index) => {
          ctx.fillStyle = index === 0 ? COLORS.sage : COLORS.clay;
          ctx.beginPath();
          ctx.roundRect(
            part.x * rSnake + 1,
            part.y * rSnake + 1,
            rSnake - 2,
            rSnake - 2,
            index === 0 ? 6 : 4
          );
          ctx.fill();

          // Eyes on head
          if (index === 0) {
            ctx.fillStyle = COLORS.bg;
            ctx.beginPath();
            ctx.arc(part.x * rSnake + 6, part.y * rSnake + 6, 2, 0, Math.PI * 2);
            ctx.arc(part.x * rSnake + 14, part.y * rSnake + 6, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      } else {
        // --- BOUNCE BALL RENDER & STEP ---
        if (gameState === "playing") {
          const ball = bounceBallRef.current;
          let paddleX = bouncePaddleRef.current;
          const paddleWidth = 80;
          const paddleHeight = 10;
          const paddleY = canvas.height - 25;

          // Move ball
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Bounce walls
          if (ball.x < 10) {
            ball.x = 10;
            ball.vx = -ball.vx;
            playSound("eat"); // warm bleep
          }
          if (ball.x > canvas.width - 10) {
            ball.x = canvas.width - 10;
            ball.vx = -ball.vx;
            playSound("eat");
          }
          if (ball.y < 10) {
            ball.y = 10;
            ball.vy = -ball.vy;
            playSound("eat");
          }

          // Gameover bottom collide
          if (ball.y > canvas.height) {
            playSound("gameover");
            setGameState("gameover");
            saveHighScore("bounce", score);
          }

          // Bounce Paddle match
          if (
            ball.y >= paddleY - 10 &&
            ball.y <= paddleY + 5 &&
            ball.x >= paddleX - 5 &&
            ball.x <= paddleX + paddleWidth + 5
          ) {
            playSound("paddle");
            ball.vy = -Math.abs(ball.vy);
            // shift angle depend on hit position
            const hitOffset = (ball.x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
            ball.vx = hitOffset * 4;
          }

          // Bounce Bricks match
          let wonAll = true;
          bounceBricksRef.current.forEach((brick) => {
            if (!brick.active) return;
            wonAll = false;

            // Simple rectangle ball check
            if (
              ball.x >= brick.x - 6 &&
              ball.x <= brick.x + brick.width + 6 &&
              ball.y >= brick.y - 6 &&
              ball.y <= brick.y + brick.height + 6
            ) {
              brick.active = false;
              ball.vy = -ball.vy;
              playSound("hit");
              setScore((s) => s + 5);
            }
          });

          if (wonAll && bounceBricksRef.current.length > 0) {
            playSound("eat");
            setGameState("gameover");
            saveHighScore("bounce", score + 100); // victory bonus
          }
        }

        // Draw Bricks
        bounceBricksRef.current.forEach((brick, idx) => {
          if (!brick.active) return;
          const brickColors = [COLORS.ochre, COLORS.amber, COLORS.sage];
          ctx.fillStyle = brickColors[idx % brickColors.length];
          ctx.beginPath();
          ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
          ctx.fill();
        });

        // Draw Paddle
        ctx.fillStyle = COLORS.clay;
        ctx.beginPath();
        const pHeight = 10;
        ctx.roundRect(bouncePaddleRef.current, canvas.height - 25, 80, pHeight, 5);
        ctx.fill();

        // Draw Ball
        ctx.fillStyle = COLORS.ochre;
        ctx.beginPath();
        ctx.arc(bounceBallRef.current.x, bounceBallRef.current.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Game Over Display Overlay on Canvas
      if (gameState === "gameover") {
        ctx.fillStyle = "rgba(106, 100, 90, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = COLORS.sand;
        ctx.textAlign = "center";
        ctx.fillText("ARCADE OVER", canvas.width / 2, canvas.height / 2 - 20);

        ctx.font = "14px 'JetBrains Mono', monospace";
        ctx.fillStyle = COLORS.bg;
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 15);
        ctx.fillText("Click REPLAY down below to start!", canvas.width / 2, canvas.height / 2 + 45);
      } else if (gameState === "idle") {
        ctx.fillStyle = "rgba(106, 100, 90, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = COLORS.sand;
        ctx.textAlign = "center";
        ctx.fillText(`Fatma's Modern Canvas Arcade`, canvas.width / 2, canvas.height / 2 - 15);

        ctx.font = "13px 'JetBrains Mono', monospace";
        ctx.fillStyle = COLORS.bg;
        ctx.fillText(`Play ${activeGame === "snake" ? "Snake Master" : "Bounce Ball"}`, canvas.width / 2, canvas.height / 2 + 15);
        ctx.fillText("Click START GAME to run!", canvas.width / 2, canvas.height / 2 + 40);
      } else if (gameState === "paused") {
        ctx.fillStyle = "rgba(106, 100, 90, 0.65)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = COLORS.sand;
        ctx.textAlign = "center";
        ctx.fillText(`GAME PAUSED`, canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = "13px monospace";
        ctx.fillStyle = COLORS.bg;
        ctx.fillText(`Click PLAY icon to resume.`, canvas.width / 2, canvas.height / 2 + 15);
      }

      // Loop callback
      if (gameState === "playing") {
        gameLoopRef.current = requestAnimationFrame(render);
      } else {
        // Draw one final static frame representing state
        ctx.font = ""; // reset
      }
    };

    // Initial frame or start loop
    if (gameState === "playing") {
      gameLoopRef.current = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, activeGame, score]);

  // Handle touch target controls for tablet & mobile compatibility
  const handleOnScreenControl = (direction: "up" | "down" | "left" | "right") => {
    if (gameState !== "playing") return;
    if (activeGame === "snake") {
      const dir = snakeDirRef.current;
      if (direction === "up" && dir.y !== 1) snakeDirRef.current = { x: 0, y: -1 };
      if (direction === "down" && dir.y !== -1) snakeDirRef.current = { x: 0, y: 1 };
      if (direction === "left" && dir.x !== 1) snakeDirRef.current = { x: -1, y: 0 };
      if (direction === "right" && dir.x !== -1) snakeDirRef.current = { x: 1, y: 0 };
    } else {
      const step = 40;
      if (direction === "left") bouncePaddleRef.current = Math.max(0, bouncePaddleRef.current - step);
      if (direction === "right") bouncePaddleRef.current = Math.min(320, bouncePaddleRef.current + step);
    }
  };

  return (
    <section id="arcade" className="py-16 px-6 md:px-12 bg-clay/35 border-b border-ochre/20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header summary info */}
        <div className="text-center mb-10" id="arcade-intro">
          <span className="text-xs uppercase tracking-widest font-mono text-sand font-bold block mb-1">Canvas Sandbox</span>
          <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold text-sand mt-1">
            Fatma's <span className="text-amber font-sans uppercase">HTML5 Retro Arcade</span>
          </h2>
          <p className="text-amber/80 text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Test games created using vanilla HTML5 Canvas API vectors. Steer via Arrow keys on a computer or on-screen directional touchpads.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="arcade-dashboard">
          
          {/* Column A: Controls Section */}
          <div className="lg:col-span-4 bg-[#5D7052] p-6 rounded-3xl border border-sand/20 flex flex-col justify-between shadow-xl" id="arcade-controls-col">
            <div>
              <h3 className="font-extrabold text-lg text-sand flex items-center gap-2 mb-4 font-sans uppercase tracking-wide">
                <Gamepad2 className="w-5 h-5 text-sand animate-pulse" />
                Select Cartridge
              </h3>
              
              {/* Game Toggles */}
              <div className="flex flex-col gap-2.5" id="arcade-game-toggles">
                <button
                  onClick={() => {
                    setActiveGame("snake");
                    setGameState("idle");
                    setScore(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 flex justify-between items-center ${
                    activeGame === "snake"
                      ? "bg-[#C18845] text-[#37463D] border-transparent shadow-md"
                      : "bg-[#37463D]/55 text-[#FAF8F5]/80 border-sand/15 hover:bg-[#37463D]/80"
                  }`}
                  id="tab-game-snake"
                >
                  <span>1. Snake Master</span>
                  <span className="text-[10px] font-mono opacity-90 block">High: {highScore.snake}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveGame("bounce");
                    setGameState("idle");
                    setScore(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 flex justify-between items-center ${
                    activeGame === "bounce"
                      ? "bg-[#C18845] text-[#37463D] border-transparent shadow-md"
                      : "bg-[#37463D]/55 text-[#FAF8F5]/80 border-sand/15 hover:bg-[#37463D]/80"
                  }`}
                  id="tab-game-bounce"
                >
                  <span>2. Ball Breakout</span>
                  <span className="text-[10px] font-mono opacity-90 block">High: {highScore.bounce}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveGame("video");
                    setGameState("idle");
                    setScore(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 flex justify-between items-center ${
                    activeGame === "video"
                      ? "bg-[#C18845] text-[#37463D] border-transparent shadow-md"
                      : "bg-[#37463D]/55 text-[#FAF8F5]/80 border-sand/15 hover:bg-[#37463D]/80"
                  }`}
                  id="tab-game-video"
                >
                  <span>3. Website Walkthrough</span>
                  <span className="text-[10px] font-mono opacity-90 block">Demo Video</span>
                </button>
              </div>

              {/* Status information panel */}
              <div className="mt-6 bg-[#37463D]/35 text-sand p-4 rounded-2xl border border-sand/15 text-xs font-light leading-relaxed" id="arcade-instructions">
                <p className="font-bold text-sand font-mono mb-1 text-[11px] uppercase tracking-wider">How to Play:</p>
                {activeGame === "snake" ? (
                  <p>Steer the snake head using keyboard Arrow Keys or the touch panel. Eat the ochre gold items. Do not slam into segments or borders!</p>
                ) : activeGame === "bounce" ? (
                  <p>Steer the baseline paddle left or right to reflect the bouncing ball. Destroy all columns of colored blocks above. Reflecting on centers boosts angles!</p>
                ) : (
                  <p>Use html canva's to watch a video from ur directory just to test this tool in HTML!</p>
                )}
              </div>
            </div>

            {/* Scoreboard and Sound settings button */}
            <div className="mt-8 pt-4 border-t border-sand/15 flex items-center justify-between" id="arcade-score-sound">
              <div>
                <span className="text-[10px] font-mono text-sand/65 block uppercase tracking-widest font-bold">ARCADE SCORE</span>
                <span className="text-2xl font-black text-amber ml-0.5 font-mono">{score} <span className="text-xs text-sand/50 font-sans tracking-wide">PTS</span></span>
              </div>

              <button
                onClick={() => setSoundEnabled((s) => !s)}
                className={`p-2.5 rounded-full transition-all duration-300 ${soundEnabled ? "bg-sand text-[#37463D] hover:bg-amber" : "bg-[#37463D]/55 text-amber/40 border border-sand/15"}`}
                title="Toggle Synth Sound Bleeps"
                id="arcade-btn-mute"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Column B: Active Retro Canvas Station Area */}
          <div className="lg:col-span-8 flex flex-col gap-4 items-center" id="arcade-display-col">
            <div className="relative w-full max-w-[440px] bg-[#2c2925] border-[6px] border-sand/25 rounded-[1.8rem] shadow-2xl flex flex-col overflow-hidden" id="arcade-hardware-device">
              
              {/* Retro Machine Screen Cap bezel */}
              <div className="bg-[#2c2925] px-4 py-1.5 flex justify-between items-center text-[10px] font-mono font-bold tracking-wider text-[#E3CD8B]/40 select-none border-b border-[#FAF8F5]/10">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand animate-ping" />
                  FM-80 COMPUTER SYSTEM
                </span>
                <span>CRT VECTOR GRAPHICS</span>
              </div>

              {/* HTML5 Canvas or Video Viewport */}
              {activeGame !== "video" ? (
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="w-full h-auto bg-[#1a1a1a] block transition-all animate-float"
                  style={{ imageRendering: "pixelated" }}
                  id="arcade-canvas"
                />
              ) : (
                <div className="w-full h-[300px] bg-[#1a1a1a] flex flex-col items-center justify-center p-4 relative overflow-hidden" id="arcade-video-container">
                  {/* CRT Scanline Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/5 to-transparent pointer-events-none z-10" />
                  
                  {videoSrc ? (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-contain"
                      id="arcade-video-player"
                    />
                  ) : (
                    <div className="text-center p-6 flex flex-col items-center gap-4 z-10">
                      <div className="w-16 h-16 rounded-full bg-sand/10 flex items-center justify-center border border-sand/20 animate-pulse">
                        <Play className="w-8 h-8 text-sand fill-current" />
                      </div>
                      <div>
                        <h4 className="text-sand font-bold text-xs tracking-widest uppercase">Select Site Walkthrough Demo</h4>
                        <p className="text-[11px] text-[#FAF8F5]/60 mt-2 max-w-[280px] mx-auto leading-relaxed">
                          Choose the mp4 video key file of your retro game website demo walkthrough to display inside this CRT vector terminal.
                        </p>
                      </div>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#C18845] hover:bg-[#E3CD8B] text-[#37463D] text-[10px] font-black uppercase tracking-widest py-2.5 px-5 rounded-full shadow-md transition-all duration-300 cursor-pointer"
                        id="btn-upload-video-trigger"
                      >
                        📂 Select Demo Video
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setVideoSrc(URL.createObjectURL(file));
                          }
                        }}
                        accept="video/*"
                        className="hidden"
                        id="video-file-input"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Hardware Console button interface */}
              <div className="bg-[#2c2925] p-4 flex justify-between items-center gap-4 text-sand border-t border-[#FAF8F5]/10" id="arcade-controls-pad">
                {activeGame !== "video" ? (
                  <>
                    <div className="flex gap-2">
                      {gameState !== "playing" ? (
                        <button
                          onClick={initializeGame}
                          className="bg-[#C18845] hover:bg-[#E3CD8B] text-[#37463D] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                          id="arcade-action-start"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{gameState === "gameover" ? "REPLAY" : "START GAME"}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setGameState("paused")}
                          className="bg-[#C18845] hover:bg-[#E3CD8B] text-[#37463D] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                          id="arcade-action-pause"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSE</span>
                         </button>
                      )}
                    </div>

                    {/* On-screen controls for mobile/touch screens */}
                    <div className="flex gap-1.5 items-center" id="arcade-interactive-touchpad">
                      {activeGame === "snake" ? (
                        <div className="grid grid-cols-3 gap-1" id="arcade-snake-pad">
                          <div />
                          <button
                            onClick={() => handleOnScreenControl("up")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand p-1.5 rounded-lg active:scale-95 transition-transform text-xs"
                            id="touchpad-up"
                          >
                            ▲
                          </button>
                          <div />
                          <button
                            onClick={() => handleOnScreenControl("left")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand p-1.5 rounded-lg active:scale-95 transition-transform text-xs"
                            id="touchpad-left"
                          >
                            ◀
                          </button>
                          <button
                            onClick={() => handleOnScreenControl("down")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand p-1.5 rounded-lg active:scale-95 transition-transform text-xs"
                            id="touchpad-down"
                          >
                            ▼
                          </button>
                          <button
                            onClick={() => handleOnScreenControl("right")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand p-1.5 rounded-lg active:scale-95 transition-transform text-xs"
                            id="touchpad-right"
                          >
                            ▶
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2" id="arcade-paddle-pad">
                          <button
                            onClick={() => handleOnScreenControl("left")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand px-3 py-1.5 rounded-full active:scale-95 transition-all font-mono text-[9px] uppercase tracking-widest font-bold border border-sand/15"
                            id="touchpad-reflect-left"
                          >
                            ◀ PADDLE
                          </button>
                          <button
                            onClick={() => handleOnScreenControl("right")}
                            className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand px-3 py-1.5 rounded-full active:scale-95 transition-all font-mono text-[9px] uppercase tracking-widest font-bold border border-sand/15"
                            id="touchpad-reflect-right"
                          >
                            PADDLE ▶
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full p-1" id="arcade-video-controls">
                    <span className="text-[10px] font-mono tracking-widest text-[#E3CD8B]/60 font-medium">
                      CRT CO-PROCESSOR ACTIVE
                    </span>
                    {videoSrc && (
                      <button
                        onClick={() => setVideoSrc(null)}
                        className="bg-[#37463D]/55 hover:bg-[#37463D]/80 text-sand text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full border border-sand/15 cursor-pointer"
                        id="video-reset-btn"
                      >
                        Change Video File
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
