// Seleciona elementos HTML
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

// Botões
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

// Tamanho de cada quadrado
const box = 20;

// Variáveis do jogo
let snake;
let food;
let direction;
let score;
let game; // variável do intervalo principal
let isRunning = false; // controle de estado do jogo

// Inicializa o jogo (reset)
function initGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  scoreEl.innerText = score;
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
}

// Função para detectar colisão com o corpo
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

// Desenha o jogo
function draw() {
  // Fundo
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Pega posição atual
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Atualiza movimento
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Se comeu a comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreEl.innerText = score;
    // Gera nova comida
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop(); // remove último segmento
  }

  // Nova cabeça
  let newHead = { x: snakeX, y: snakeY };

  // Verifica colisões
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    isRunning = false;
    alert("Game Over! Pontuação final: " + score);
    return;
  }

  snake.unshift(newHead);
}

// Escuta as teclas de direção
document.addEventListener("keydown", (event) => {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  if (key === 38 && direction !== "DOWN") direction = "UP";
  if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  if (key === 40 && direction !== "UP") direction = "DOWN";
});

// Função para iniciar o jogo
function startGame() {
  if (!isRunning) {
    isRunning = true;
    game = setInterval(draw, 100);
  }
}

// Função para pausar o jogo
function pauseGame() {
  if (isRunning) {
    clearInterval(game);
    isRunning = false;
  }
}

// Função para reiniciar o jogo
function restartGame() {
  clearInterval(game);
  initGame();
  startGame();
}

// Conecta botões às funções
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", restartGame);

// Inicializa o jogo ao carregar a página
initGame();
