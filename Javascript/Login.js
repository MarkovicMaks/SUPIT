(() => {
  const loginForm = document.querySelector("#FormLogin");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const errorMsg = document.querySelector("#errorMsg");
  const loggingout = document.querySelector("#Logout");
  const usernameDisplay = document.querySelector("#usernameDisplay");

  document.addEventListener("DOMContentLoaded", (event) => {
    updateNavbarWithUsername();
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });

  loggingout.addEventListener("click", logoutFunction);

  function login() {
    const loginData = {
      username: username.value,
      password: password.value,
    };

    console.log("lginaj s:", loginData);

    fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.statusCode === 200 && data.isSuccess) {
          storeTokenToSessionStorage(data.data.token);
          sessionStorage.setItem("username", loginData.username);
          console.log(
            "Stored username in session storage:",
            loginData.username
          );
          updateNavbarWithUsername();
        } else {
          errorMsg.style.display = "block";
        }
      })
      .catch((error) => console.error("Fetch error:", error));

    console.log(response);

    function storeTokenToSessionStorage(token) {
      sessionStorage.setItem("token", token);
    }

  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  function updateNavbarWithUsername() {
    const storedUsername = sessionStorage.getItem("username");
    console.log(sessionStorage.getItem("username"));
    if (storedUsername) {
      document.getElementById("loginButton").textContent = storedUsername;
      usernameDisplay.style.display = "inline";
      console.log(2);
    } else {
      document.getElementById("loginButton").textContent = "Login";
      usernameDisplay.style.display = "none";
      console.log(3);
    }
  }
})();
