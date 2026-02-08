const CORRECT_PASSCODE = "1402";
const START_DATE = "2025-09-02";

let currentInput = "";
let currentSlide = 1;

function appendDigit(digit) {
  if (currentInput.length < 4) {
    currentInput += digit;
    document.getElementById("passcode-display").innerText = "*".repeat(
      currentInput.length
    );
  }
}

function clearPasscode() {
  currentInput = "";
  document.getElementById("passcode-display").innerText = "";
}

function checkPasscode() {
  if (currentInput === CORRECT_PASSCODE) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("bgMusic").play();
    startHearts();
    calculateDays();
    updateNav();
    startTyping();
  } else {
    document.getElementById("error-msg").innerText = "Mật mã chưa đúng rồi...";
    clearPasscode();
  }
}

function changeSlide(dir) {
  document
    .querySelector(`.slide[data-index="${currentSlide}"]`)
    .classList.remove("active");
  currentSlide += dir;
  document
    .querySelector(`.slide[data-index="${currentSlide}"]`)
    .classList.add("active");
  updateNav();
  startTyping();
}

function updateNav() {
  const total = document.querySelectorAll(".slide").length;
  document.getElementById("prevBtn").style.visibility =
    currentSlide === 1 ? "hidden" : "visible";
  document.getElementById("nextBtn").style.visibility =
    currentSlide === total ? "hidden" : "visible";
}

function startTyping() {
  const activeSlide = document.querySelector(
    `.slide[data-index="${currentSlide}"]`
  );
  const typingEl = activeSlide.querySelector(".typing");
  if (typingEl && typingEl.innerHTML === "") {
    const text = typingEl.getAttribute("data-text");
    let i = 0;
    function type() {
      if (i < text.length) {
        typingEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    }
    type();
  }
}

function calculateDays() {
  const start = new Date(START_DATE);
  const diff = Math.ceil(Math.abs(new Date() - start) / (1000 * 60 * 60 * 24));
  document.getElementById("days-count").innerText = diff;
}

function restartExperience() {
  location.reload();
}

function startHearts() {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const hearts = [];
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hearts.length < 35)
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        s: Math.random() * 15 + 10,
        sp: Math.random() * 1.5 + 0.5,
        op: Math.random(),
      });
    hearts.forEach((h, i) => {
      ctx.globalAlpha = h.op * 0.5;
      ctx.font = h.s + "px Arial";
      ctx.fillText("❤️", h.x, h.y);
      h.y -= h.sp;
      if (h.y < -20) hearts.splice(i, 1);
    });
    requestAnimationFrame(draw);
  }
  draw();
}
