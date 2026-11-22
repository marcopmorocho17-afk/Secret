const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const celebration = document.getElementById("celebration");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let noAttempts = 0;

function moveNoButton() {
  noAttempts += 1;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const padding = 20;
  const maxX = window.innerWidth - buttonWidth - padding;
  const maxY = window.innerHeight - buttonHeight - padding;

  noButton.style.position = "fixed";
  noButton.style.left = `${padding + Math.random() * (maxX - padding)}px`;
  noButton.style.top = `${padding + Math.random() * (maxY - padding)}px`;

  if (noAttempts > 2) {
    yesButton.style.transform = `scale(${Math.min(1 + noAttempts * 0.08, 1.55)})`;
  }
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener("click", () => {
  document.getElementById("pregunta").hidden = true;
  celebration.hidden = false;
  celebration.scrollIntoView({ behavior: "smooth" });
  launchConfetti();
});

function launchConfetti() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.5,
    w: 5 + Math.random() * 7,
    h: 8 + Math.random() * 10,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 5,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.12 + Math.random() * 0.24,
    color: ["#c9363d", "#edaaa8", "#f1d49a", "#fffaf2", "#8f9d78"][Math.floor(Math.random() * 5)]
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach((piece) => {
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += 0.025;
      piece.rotation += piece.rotationSpeed;

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
      ctx.restore();
    });

    frame += 1;
    if (frame < 240) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  draw();
}
