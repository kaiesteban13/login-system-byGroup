const API_URL = "http://localhost:5000"; // Change this to your backend URL if needed

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const authOverlay = document.getElementById("authOverlay");
const closeAuth = document.getElementById("closeAuth");

function openAuth(mode) {
  authOverlay.classList.remove("hidden");
  if (mode === "register") {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  } else {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }
}

function closeAuthModal() {
  authOverlay.classList.add("hidden");
}

// Buttons on the landing page that open the modal
document.getElementById("navLogin").addEventListener("click", () => openAuth("login"));
document.getElementById("navSignup").addEventListener("click", () => openAuth("register"));
document.getElementById("heroLogin").addEventListener("click", () => openAuth("login"));
document.getElementById("heroSignup").addEventListener("click", () => openAuth("register"));

closeAuth.addEventListener("click", closeAuthModal);
authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) closeAuthModal();
});

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    message.textContent = data.message;

    if (response.ok) {
      registerForm.reset();
    }
  } catch (error) {
    message.textContent = "Cannot connect to the server.";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    message.textContent = data.message;

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    message.textContent = "Cannot connect to the server.";
  }
});