const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let timeLeft = 30; // 30 seconds game clock
let isGameOver = false;
let timerInterval;

let target = { x: 200, y: 200, radius: 25 };

function moveTarget() {
    target.x = Math.random() * (canvas.width - 60) + 30;
    target.y = Math.random() * (canvas.height - 60) + 30;
}

// Start the 1-second countdown timer
function startTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            isGameOver = true;
            clearInterval(timerInterval); // Stop the clock
        }
    }, 1000);
}

// Handle clicks and screen touches
canvas.addEventListener("pointerdown", function(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const touchX = (event.clientX - rect.left) * scaleX;
    const touchY = (event.clientY - rect.top) * scaleY;
    
    if (!isGameOver) {
        // Game is running: check if target is hit
        const dist = Math.sqrt((touchX - target.x)**2 + (touchY - target.y)**2);
        if (dist < target.radius) {
            score++;
            moveTarget();
        }
    } else {
        // Game is over: check if they tapped the "Play Again" box area
        if (touchX > 120 && touchX < 280 && touchY > 230 && touchY < 280) {
            resetGame();
        }
    }
});

function resetGame() {
    score = 0;
    timeLeft = 30;
    isGameOver = false;
    moveTarget();
    startTimer(); // Restart the clock
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!isGameOver) {
        // --- DRAW ACTIVE GAME ---
        // Draw Target
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#FF5733";
        ctx.fill();
        ctx.closePath();
        
        // Draw Live Score and Time Left
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
        ctx.fillText("Time: " + timeLeft + "s", canvas.width - 100, 30);
    } else {
        // --- DRAW GAME OVER SCREEN ---
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER!", canvas.width / 2, 130);
        
        ctx.font = "20px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2, 180);
        
        // Draw "Play Again" Button Box
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(120, 230, 160, 50);
        
        // Button Text
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Arial";
        ctx.fillText("Play Again", canvas.width / 2, 262);
        
        // Reset text alignment for next frames
        ctx.textAlign = "left";
    }
    
    requestAnimationFrame(draw);
}

// Start the game for the first time
startTimer();
draw();
