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
Eman Tahir
Computer Science Undergraduate — University of Liverpool

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
    Focus: API design, system architecture
    Repo: https://github.com/emanntahirr/finance-tracker-v2

[2] Application Layer Chat
    TCP socket-based chat application
    Stack: Java
    Focus: Networking fundamentals
    Repo: https://github.com/emanntahirr/Application-Layer-Chat

[3] Advent of Code 2025 (Java)
    Daily algorithmic challenges
    Focus: data structures & problem solving
    Repo: https://github.com/emanntahirr/advent-of-code-2025-java
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
LinkedIn: https://www.linkedin.com
`,

  clear: ""
};

function print(text) {
  output.innerHTML += text + "\n";
  window.scrollTo(0, document.body.scrollHeight);
}

function bootSequence() {
  typeBootText(bootLines);

  document.addEventListener("keydown", () => {
    bootScreen.style.display = "none";
  }, { once: true });
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    print(`> ${cmd}`);

    if (commands[cmd]) {
      if (cmd === "clear") {
        output.innerHTML = "";
      } else {
        print(commands[cmd]);
      }
    } else if (cmd !== "") {
      print("command not found. type 'help'");
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

bootSequence();
