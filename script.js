const workspace = document.getElementById("workspace");
const dock = document.getElementById("dock");

let zIndex = 1;

/* App Launcher Click */
document.querySelectorAll(".app-card").forEach(card => {
  card.addEventListener("click", () => {
    openApp(card.dataset.app);
  });
});

/* Open App */
function openApp(app) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.top = "100px";
  win.style.left = "100px";
  win.style.zIndex = zIndex++;

  let content = "";

  if (app === "google") {
    content = `<iframe src="https://www.google.com"></iframe>`;
  } else if (app === "youtube") {
    content = `<iframe src="https://www.youtube.com"></iframe>`;
  } else if (app === "calculator") {
    content = `
      <div class="window-content">
        <input id="calcInput" type="text" style="width:100%;padding:10px;font-size:20px"/>
        <button onclick="calculate()" style="width:100%;padding:10px;">=</button>
      </div>
    `;
  }

  win.innerHTML = `
    <div class="window-header">
      <span>${app}</span>
      <div class="window-controls">
        <button onclick="minimize(this)">_</button>
        <button onclick="closeWin(this)">✖</button>
      </div>
    </div>
    ${content}
  `;

  workspace.appendChild(win);
  dragElement(win);
}

/* Dragging */
function dragElement(el) {
  let pos1=0,pos2=0,pos3=0,pos4=0;
  const header = el.querySelector(".window-header");

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* Close */
function closeWin(btn) {
  btn.closest(".window").remove();
}

/* Minimize */
function minimize(btn) {
  const win = btn.closest(".window");
  win.style.display = "none";

  const dockItem = document.createElement("div");
  dockItem.className = "dock-item";
  dockItem.innerText = "App";

  dockItem.onclick = () => {
    win.style.display = "flex";
    dockItem.remove();
  };

  dock.appendChild(dockItem);
}

/* Calculator */
function calculate() {
  const input = document.getElementById("calcInput");
  try {
    input.value = eval(input.value);
  } catch {
    input.value = "Error";
  }
}
