const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let stars = [];

function createStar() {
    const x = Math.random() * (canvas.width - 50);
    const y = Math.random() * (canvas.height - 50);
    stars.push({ x, y });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star, index) => {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(star.x, star.y, 20, 0, Math.PI * 2);
        ctx.fill();
    });
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    stars = stars.filter(star => {
        const distance = Math.sqrt((clickX - star.x) ** 2 + (clickY - star.y) ** 2);
        if (distance < 20) {
            score += 1;
            document.getElementById('score').innerText = `得分: ${score}`;
            return false;
        }
        return true;
    });
});

setInterval(() => {
    createStar();
    drawStars();
}, 1000); // 每秒生成一个星星

drawStars();
