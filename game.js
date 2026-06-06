const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let target = { x: 200, y: 200, radius: 25 }; // Made slightly larger for easier finger tapping

function moveTarget() {
    target.x = Math.random() * (canvas.width - 60) + 30;
    target.y = Math.random() * (canvas.height - 60) + 30;
}

// "pointerdown" works flawlessly for both Mouse Clicks and Screen Touches
canvas.addEventListener("pointerdown", function(event) {
    const rect = canvas.getBoundingClientRect();
    
    // This math calculates the exact spot touched, even if the canvas is resized on a phone
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const touchX = (event.clientX - rect.left) * scaleX;
    const touchY = (event.clientY - rect.top) * scaleY;
    
    // Check if player tapped inside the circle target
    const dist = Math.sqrt((touchX - target.x)**2 + (touchY - target.y)**2);
    if (dist < target.radius) {
        score++;
        moveTarget();
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Target
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF5733";
    ctx.fill();
    ctx.closePath();
    
    // Draw Score text
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    
    requestAnimationFrame(draw);
}

draw();
