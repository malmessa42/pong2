const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const user = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0,
    moveSpeed: 4 // User paddle speed
};

const ai = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    velocityX: 4,
    velocityY: 4,
    color: 'WHITE'
};

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawArc(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 4;
    ball.velocityX = 4;
    ball.velocityY = 4;
}

// function update() {
//     // Move the AI
//     if (ai.y < ball.y) {
//         ai.y += 4; // AI speed
//     } else {
//         ai.y -= 4; // AI speed
//     }

//     // Move the ball
//     ball.x += ball.velocityX;
//     ball.y += ball.velocityY;

//     // Collision detection for ball
//     if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
//         ball.velocityY = -ball.velocityY;
//     }

//     let player = (ball.x < canvas.width / 2) ? user : ai;

//     if (ball.x - ball.radius < player.x + player.width && ball.x + ball.radius > player.x &&
//         ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height) {
//         ball.velocityX = -ball.velocityX;
//     }

//     // Scoring
//     if (ball.x - ball.radius < 0) {
//         ai.score++;
//         resetBall();
//     } else if (ball.x + ball.radius > canvas.width) {
//         user.score++;
//         resetBall();
//     }
// }

function update() {
    // Move the AI with a speed limit
    const aiSpeed = 4; // Speed for the AI
    const reactionRange = 150; // Distance from the AI where it starts to react

    // Determine if the ball is moving back towards the AI
    const ballMovingTowardsAI = ball.x < canvas.width / 2 && ball.velocityX < 0;

    // Allow AI paddle movement only if the ball is approaching it
    if (ballMovingTowardsAI) {
        const ballFutureY = ball.y + ball.velocityY;

        // Move the AI to intercept the ball's future position
        if (ai.y + ai.height / 2 < ballFutureY) {
            ai.y += aiSpeed; // Move down
        } else if (ai.y + ai.height / 2 > ballFutureY) {
            ai.y -= aiSpeed; // Move up
        }

        // Keep AI within canvas bounds
        ai.y = Math.max(Math.min(ai.y, canvas.height - ai.height), 0);
    }

    // Move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Collision detection for ball
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : ai;

    if (ball.x - ball.radius < player.x + player.width && ball.x + ball.radius > player.x &&
        ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height) {
        ball.velocityX = -ball.velocityX;
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        ai.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}



function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'BLACK');
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && user.y > 0) {
        user.y -= user.moveSpeed; // Move up
    } else if (event.key === 'ArrowDown' && user.y < canvas.height - user.height) {
        user.y += user.moveSpeed; // Move down
    }
});

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
