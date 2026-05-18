const workspace = document.getElementById("workspace");
const taskbar = document.getElementById("taskbar");

let z = 1;

/* Launcher */
document.querySelectorAll(".app-card").forEach(card => {
  card.onclick = () => openApp(card.dataset.app);
});

/* Open App */
function openApp(app) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.top = "80px";
  win.style.left = "80px";
  win.style.zIndex = z++;

  let content = "";

  if (app === "google") {
    content = `<iframe src="https://example.com"></iframe>`;
  } else if (app === "youtube") {
    content = `<iframe src="https://example.com"></iframe>`;
  } else {
    content = `
      <div class="window-content">
        <input id="calc" style="width:100%;padding:10px">
        <button onclick="calc()">=</button>
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
    <div class="resize-handle"></div>
  `;

  workspace.appendChild(win);

  drag(win);
  resize(win);
}

/* DRAG (Mouse + Touch) */
function drag(el) {
  const header = el.querySelector(".window-header");

  let offsetX, offsetY;

  function start(e) {
    const rect = el.getBoundingClientRect();
    offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", stop);
  }

  function move(e) {
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);

    el.style.left = (x - offsetX) + "px";
    el.style.top = (y - offsetY) + "px";
  }

  function stop() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", stop);
  }

  header.addEventListener("mousedown", start);
  header.addEventListener("touchstart", start);
}

/* RESIZE */
function resize(el) {
  const handle = el.querySelector(".resize-handle");

  let startX, startY, startW, startH;

  handle.addEventListener("mousedown", init);
  handle.addEventListener("touchstart", init);

  function init(e) {
    e.preventDefault();

    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;

    startW = el.offsetWidth;
    startH = el.offsetHeight;

    document.addEventListener("mousemove", resizeMove);
    document.addEventListener("mouseup", stop);

    document.addEventListener("touchmove", resizeMove);
    document.addEventListener("touchend", stop);
  }

  function resizeMove(e) {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    el.style.width = (startW + x - startX) + "px";
    el.style.height = (startH + y - startY) + "px";
  }

  function stop() {
    document.removeEventListener("mousemove", resizeMove);
    document.removeEventListener("mouseup", stop);
    document.removeEventListener("touchmove", resizeMove);
    document.removeEventListener("touchend", stop);
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

  const item = document.createElement("div");
  item.className = "task-item";
  item.innerText = "App";

  item.onclick = () => {
    win.style.display = "flex";
    item.remove();
  };

  taskbar.appendChild(item);
}

/* Calculator */
function calc() {
  const input = document.getElementById("calc");
  try {
    input.value = eval(input.value);
  } catch {
    input.value = "Error";
  }
}
