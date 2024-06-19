(() => {
  const loginForm = document.querySelector("#FormLogin");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const errorMsg = document.querySelector("#errorMsg");
  const logoutLink = document.querySelector("#logoutLink");
  
  if(sessionStorage.getItem("token") != null) {
    document.getElementById("usernameDropdown").style.display = "block";
    document.getElementById("NastavniPlan").style.display = "block";
    
    document.getElementById("loginButton").style.display = "none";
    dropdownMenuButton.innerText = sessionStorage.getItem("username");
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });

  logoutLink.addEventListener("click", logoutFunction);

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
          document.getElementById("usernameDropdown").style.display = "block";
          document.getElementById("NastavniPlan").style.display = "block";
          
          document.getElementById("loginButton").style.display = "none";
          dropdownMenuButton.innerText = sessionStorage.getItem("username");
          
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

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  function logoutFunction() {
    sessionStorage.clear();
    document.getElementById("usernameDropdown").style.display = "none";
    document.getElementById("NastavniPlan").style.display = "none";
    document.getElementById("loginButton").style.display = "inline-block";
    window.location.href = "index.html";
  }
})();
