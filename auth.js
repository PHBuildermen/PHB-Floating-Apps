// Simple LocalStorage Auth (GitHub-friendly demo)

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { username: "PHBuilderman", password: "@HugePasscode1" }
  ]));
}

function signup(username, password) {
  let users = JSON.parse(localStorage.getItem("users"));

  if (users.find(u => u.username === username)) {
    return alert("User already exists");
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created!");
  window.location.href = "login.html";
}

function login(username, password) {
  let users = JSON.parse(localStorage.getItem("users"));

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return alert("Invalid credentials");
  }

  localStorage.setItem("currentUser", username);
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
