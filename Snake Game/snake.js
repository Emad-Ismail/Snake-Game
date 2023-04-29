const canvas = document.querySelector("canvas");
canvas.width = 608;
canvas.height = 608;
const c = canvas.getContext("2d");

const box = 32;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};
let dir;
let game;
let score = 0;

document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
  clearInterval(game);
  snake = [{ x: 9 * box, y: 10 * box }];
  dir = "";
  game = setInterval(draw, 100);
}

function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    c.fillStyle = i === 0 ? "green" : "white";
    c.fillRect(snake[i].x, snake[i].y, box, box);
  }

  c.fillStyle = "red";
  c.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (dir === "left") snakeX -= box;
  if (dir === "up") snakeY -= box;
  if (dir === "right") snakeX += box;
  if (dir === "down") snakeY += box;

   if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // Remove this line: if (collision(newHead, snake) || snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box) {
  if (collision(newHead, snake)) {
    clearInterval(game);
  } else {
    // Wrap the snake around the canvas when it hits the borders
    if (snakeX < box) snakeX = 17 * box;
    if (snakeX > 17 * box) snakeX = box;
    if (snakeY < 3 * box) snakeY = 17 * box;
    if (snakeY > 17 * box) snakeY = 3 * box;
  }
  snake.unshift(newHead);
}

function direction(event) {
  if (event.keyCode === 37 && dir !== "right") dir = "left";
  if (event.keyCode === 38 && dir !== "down") dir = "up";
  if (event.keyCode === 39 && dir !== "left") dir = "right";
  if (event.keyCode === 40 && dir !== "up") dir = "down";
}

function collision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) return true;
  }
  return false;
}

document.addEventListener("keydown", direction);
