const bootLines = [
  "> initialising system...",
  "> loading profile...",
  "> hello",
  "> my name is eman",
  "> computer science undergraduate",
  "> systems | backend | algorithms",
  "",
  "press any key to enter terminal"
];

const bootScreen = document.getElementById("boot-screen");
const bootText = document.getElementById("boot-text");
const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const canvas = document.getElementById("binary-bg");
const ctx = canvas.getContext("2d");

let cols;
let rows;
let grid = [];

const commands = {
  help: `
Available commands:
- about
- projects
- skills
- now
- contact
- clear
`,

  about: `
Eman Fatima
2nd Year Computer Science Undergraduate — University of Liverpool

Interests:
- Backend & systems engineering
- Networking & distributed systems
- Algorithmic problem solving
- Applied AI

Focus:
Building reliable software with clean abstractions
and strong architectural foundations.
`,

  projects: `
[1] Finance Tracker v2
    Full-stack finance & investment simulator
    Stack: Java, Spring Boot, React
    <a href="https://github.com/emanntahirr/finance-tracker-v2" target="_blank">View repository</a>

[2] Application Layer Chat
    TCP socket-based chat application
    Stack: Java
    <a href="https://github.com/emanntahirr/Application-Layer-Chat" target="_blank">View repository</a>

[3] Advent of Code 2025 (Java)
    Algorithmic problem solving challenges
    <a href="https://github.com/emanntahirr/advent-of-code-2025-java" target="_blank">View repository</a>
`,


  skills: `
Languages:
- Java
- TypeScript
- Python

Backend & Systems:
- Spring Boot
- REST APIs
- TCP/IP
- Socket programming

Concepts:
- Data structures & algorithms
- Software architecture
- Client–server models
`,

  now: `
Currently:
- Strengthening systems fundamentals
- Exploring backend and low-level engineering
- Refining portfolio projects with clean design
`,

  contact: `
GitHub: https://github.com/emanntahirr
LinkedIn: https://www.linkedin.com/in/eman-fatima-tahir-4ab6b4267/
Email: emanfatima.1131@gmail.com
`,

  clear: ""
};

const projectLinks = {
  "open finance": "https://github.com/emanntahirr/finance-tracker-v2",
  "open chat": "https://github.com/emanntahirr/Application-Layer-Chat",
  "open aoc": "https://github.com/emanntahirr/advent-of-code-2025-java",
};


function print(text) {
  output.innerHTML += text + "\n";
  window.scrollTo(0, document.body.scrollHeight);
}

function bootSequence() {
  startBinaryAnimation();
  typeBootText(bootLines);

  document.addEventListener("keydown", () => {
    bootScreen.classList.add("fade-out");

    clearInterval(binaryInterval);

    setTimeout(() => {
      bootScreen.style.display = "none";
      terminalWelcome();
    }, 600);
  }, { once: true });
}


input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();

    if (cmd === "") return;

    if (cmd === "clear") {
      output.innerHTML = "";
      input.value = "";
      return;
    }

    print(`> ${cmd}`);

    if (commands[cmd]) {
  print(commands[cmd]);
} else if (projectLinks[cmd]) {
  print(`Opening ${cmd.replace("open ", "")}…`);
  window.open(projectLinks[cmd], "_blank");
} else {
  print("Command not recognised.");
}


    input.value = "";
  }
});


function typeBootText(lines, lineIndex = 0, charIndex = 0) {
  if (lineIndex >= lines.length) {
    bootText.innerHTML += "<span class='cursor'>_</span>";
    return;
  }

  const currentLine = lines[lineIndex];

  if (charIndex < currentLine.length) {
    bootText.innerHTML += currentLine[charIndex];
    setTimeout(() => {
      typeBootText(lines, lineIndex, charIndex + 1);
    }, 40);
  } else {
    bootText.innerHTML += "\n";
    setTimeout(() => {
      typeBootText(lines, lineIndex + 1, 0);
    }, 300);
  }
}

function initBinaryGrid() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 14;
  cols = Math.floor(canvas.width / fontSize);
  rows = Math.floor(canvas.height / fontSize);

  grid = Array.from({ length: cols * rows }, () =>
    Math.random() > 0.5 ? "1" : "0"
  );

  ctx.font = `${fontSize}px VT323`;
  ctx.fillStyle = "#4fd1c5";
}
function drawBinaryGrid() {
  ctx.fillStyle = "rgba(11, 14, 17, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4fd1c5";

  for (let i = 0; i < grid.length; i++) {
    if (Math.random() > 0.995) {
      grid[i] = grid[i] === "0" ? "1" : "0";
    }

    const x = (i % cols) * 14;
    const y = Math.floor(i / cols) * 14;

    ctx.fillText(grid[i], x, y);
  }
}

let binaryInterval;

function startBinaryAnimation() {
  initBinaryGrid();
  binaryInterval = setInterval(drawBinaryGrid, 120);
}

function terminalWelcome() {
  print("Hi, I'm Eman.");
  print("");
  print("This is an interactive portfolio.");
  print("You can explore my background, projects, and skills.");
  print("");
  print("What would you like to see?");
  print("");
  print("Try:");
  print("- about");
  print("- projects");
  print("- skills");
  print("- contact");
  print("");
}

bootSequence();
window.addEventListener("resize", initBinaryGrid);

