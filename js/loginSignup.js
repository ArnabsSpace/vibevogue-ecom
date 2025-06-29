// loginSignup.js

function getUsers() {
  return JSON.parse(localStorage.getItem("vvUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("vvUsers", JSON.stringify(users));
}

function saveLoggedInUser(email) {
  localStorage.setItem("vvLoggedIn", email);
}

// REGISTER FUNCTION (used in register.html)
export function setupRegisterForm() {
  const form = document.getElementById("registerForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      alert("Account already exists with this email.");
      return;
    }

    users.push({ firstName, lastName, email, password });
    saveUsers(users);
    saveLoggedInUser(email);
    alert("Registration successful!");

    window.location.href = "cart.html"; // or homepage
  });
}

// LOGIN FUNCTION (used in login.html)
export function setupLoginForm() {
  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();

    // 👉 Check for demo login
    const isDemo = email === "demo@vibevogue.com" && password === "demo123";

    if (isDemo) {
      saveLoggedInUser(email);
      alert("Logged in as demo user.");
      window.location.href = "cart.html"; // or homepage
      return;
    }

    const matched = users.find(u => u.email === email && u.password === password);

    if (matched) {
      saveLoggedInUser(email);
      alert(`Welcome back, ${matched.firstName}!`);
      window.location.href = "cart.html"; // or dashboard
    } else {
      alert("Incorrect email or password.");
    }
  });
}

