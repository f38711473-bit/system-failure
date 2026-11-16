
const title = document.getElementById("title");
const story = document.getElementById("story");
const terminal = document.getElementById("terminal");
const choices = document.getElementById("choices");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const scenes = [
  {
    title: "ARE YOU ALONE?",
    story: "A strange program has appeared. Your screen flickers. Something is waiting.",
    logs: [
      "> UNKNOWN PROCESS DETECTED",
      "> CONNECTION: LOCAL SIMULATION",
      "> PLAYER SESSION STARTED"
    ],
    choices: [
      { text: "Open the message", next: 1 },
      { text: "Ignore it", next: 2 }
    ]
  },
  {
    title: "WHO ARE YOU?",
    story: "A message appears: I have been waiting for someone to find me.",
    logs: [
      "> MESSAGE RECEIVED",
      "> SENDER: UNKNOWN",
      "> DO NOT TRUST EVERYTHING YOU SEE"
    ],
    choices: [
      { text: "Ask its name", next: 3 },
      { text: "Close the message", next: 4 }
    ]
  },
  {
    title: "THAT WAS A MISTAKE",
    story: "The terminal displays a new message. It knows you are still watching.",
    logs: [
      "> WARNING: UNKNOWN MESSAGE",
      "> SIMULATED ALERT ACTIVATED"
    ],
    choices: [
      { text: "Read the message", next: 1 },
      { text: "Investigate", next: 3 }
    ]
  },
  {
    title: "I AM STILL HERE",
    story: "The unknown program responds: You were never supposed to find this room.",
    logs: [
      "> ACCESS GRANTED: STORY MODE",
      "> UNKNOWN ENTITY DETECTED",
      "> FINAL SEQUENCE READY"
    ],
    choices: [
      { text: "Continue", next: 5 },
      { text: "Escape", next: 6 }
    ]
  },
  {
    title: "CONNECTION LOST",
    story: "The screen goes quiet. But something is still running in the story.",
    logs: [
      "> MESSAGE CLOSED",
      "> SESSION INTERRUPTED"
    ],
    choices: [
      { text: "Try again", next: 0 }
    ]
  },
  {
    title: "THE LAST MESSAGE",
    story: "The terminal types one final sentence: Thank you for playing. I will be here.",
    logs: [
      "> FINAL MESSAGE RECEIVED",
      "> SIMULATION COMPLETE"
    ],
    choices: [
      { text: "Escape", next: 6 },
      { text: "Read again", next: 0 }
    ]
  },
  {
    title: "YOU ESCAPED",
    story: "The strange program closes. Your adventure is over. Or is it?",
    logs: [
      "> PLAYER ESCAPED",
      "> SIMULATION TERMINATED",
      "> NO DEVICE ACCESS OCCURRED"
    ],
    choices: []
  }
];

let currentScene = 0;
let busy = false;

function addLog(message) {
  const line = document.createElement("p");
  line.textContent = message;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function showScene(index) {
  currentScene = index;

  const scene = scenes[index];

  title.textContent = scene.title;
  story.textContent = scene.story;

  choices.replaceChildren();

  scene.logs.forEach(addLog);

  document.body.classList.add("glitch");

  setTimeout(() => {
    document.body.classList.remove("glitch");
  }, 400);

  scene.choices.forEach(choice => {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", () => {
      if (busy) return;

      busy = true;
      showScene(choice.next);

      setTimeout(() => {
        busy = false;
      }, 400);
    });

    choices.appendChild(button);
  });

  if (index === 6) {
    restartBtn.hidden = false;
  }
}

startBtn.addEventListener("click", () => {
  if (busy) return;

  busy = true;
  startBtn.hidden = true;
  terminal.replaceChildren();

  showScene(0);

  setTimeout(() => {
    busy = false;
  }, 400);
});

restartBtn.addEventListener("click", () => {
  restartBtn.hidden = true;
  startBtn.hidden = false;
  title.textContent = "ARE YOU ALONE?";
  story.textContent = "You found a strange program on your computer.";
  terminal.replaceChildren();
  choices.replaceChildren();
  currentScene = 0;
  busy = false;
});

addLog("> SYSTEM FAILURE ENGINE LOADED");
addLog("> WAITING FOR PLAYER...");
