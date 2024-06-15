(() => {
    const registerationForm = document.querySelector("#FormRegister");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    registerationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        SignUp();
    })

    function SignUp() {
        const registerData = {
            username: this.username.value,
            password: this.password.value
        }

        const response = fetch("https://www.fulek.com/data/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        })
        response.then((result) => result.json()).then((data) => {
            alert("Uspješno ste registrirani")
            location.replace("index.html")
        }).catch(() => alert("Error!"))
    }
})()