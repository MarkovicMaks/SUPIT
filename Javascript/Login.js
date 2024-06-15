(() => {
  const loginForm = document.querySelector("#FormLogin");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const errorMsg = document.querySelector("#errorMsg");
  const loginSuccessMsg = document.querySelector("#loginSuccessMsg");
  let loggingout = document.querySelector("#Logout");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });

  function login() {
    const loginData = {
      username: this.username.value,
      password: this.password.value,
    };

    console.log(loginData);

    const response = fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    console.log(response);
    response
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 404) {
          errorMsg.style.display = "block";
        }
        storeTokenToSessionStorage(data.data.token);
        errorMsg.style.display = "none";
        loginSuccessMsg.style.display = "block";
        setTimeout(redirect, 3000);
        sessionStorage.setItem("username", loginData.username);
      });

    function storeTokenToSessionStorage(token) {
      sessionStorage.setItem("token", token);
    }

    function redirect() {
      location.replace("index.html");
    }
  }

  loggingout.addEventListener("click", logoutFunction);

  function logoutFunction() {
    sessionStorage.clear();
    location.replace("index.html");
  }
})();
