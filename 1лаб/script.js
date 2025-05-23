
const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
/**
* отвечает за направление движения змейки
*/
let direction = 'right';
/**
* отвечает за скорость движения змейки
*/
let speed = 800;

function initializeGameBoard() {
for (let row = 0; row < boardSize; row++) {
for (let col = 0; col < boardSize; col++) {
const cell = document.createElement('div');
cell.className = 'cell';
cells.push(cell);
gameBoard.appendChild(cell);
}
}
}

function render() {
cells.forEach((cell) => cell.classList.remove('snake', 'food'));

snake.forEach((segment) => {
const index = segment.x + segment.y * boardSize;
cells[index].classList.add('snake');
});

const foodIndex = food.x + food.y * boardSize;
cells[foodIndex].classList.add('food');
}

function update() {
const head = Object.assign({}, snake[0]);

switch (direction) {
case 'up':
head.y -= 1;
break;
case 'down':
head.y += 1;
break;
case 'left':
head.x -= 1;
break;
case 'right':
head.x += 1;
break;
}

if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
resetGame();
return;
}

if (isCollisionWithSelf(head)) {
resetGame();
return;
}

if (head.x === food.x && head.y === food.y) {
snake.unshift(head);
generateFood();
} else {
snake.pop();
snake.unshift(head);
}
}

function isCollisionWithSelf(head) {
return snake
.slice(1)
.some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
food = {
x: Math.floor(Math.random() * boardSize),
y: Math.floor(Math.random() * boardSize),
};
}

function resetGame() {
snake = [{ x: 0, y: 0 }];
direction = 'right';
generateFood();
updateScore(snake.length);
}

initializeGameBoard();

function gameLoop() {
update();
render();
updateScore(snake.length);
setTimeout(gameLoop, speed);
}

// TODO: добавить обработчик нажатия на клавиши
document.addEventListener('keydown', function(event) {
switch (event.key) {
case 'ArrowLeft':
case 'a':
case 'ф':
direction = 'left';
break;
case 'ArrowRight':
case 'd':
case 'в':
direction = 'right';
break;
case 'ArrowUp':
case 'w':
case 'ц':
direction = 'up';
break;
case 'ArrowDown':
case 's':
case 'ы':
direction = 'down';
break;
}
});

const buttonDirections = {
up: 'up',
left: 'left',
right: 'right',
down: 'down'
};

document.getElementById('up').addEventListener('click', () => direction = buttonDirections.up);
document.getElementById('left').addEventListener('click', () => direction = buttonDirections.left);
document.getElementById('right').addEventListener('click', () => direction = buttonDirections.right);
document.getElementById('down').addEventListener('click', () => direction = buttonDirections.down);

// TODO: добавить обработчик нажатия клавиши R (сброс игры)

document.addEventListener('keydown', function(event) {
if (event.key === 'r' || event.key === 'к') {
resetGame();
}
});

// TODO: добавить возможность изменения скорости змейки

updateScore(snake.length);
gameLoop();

function updateScore(score) {
} 