const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const btn_element = document.getElementById("loginBtn");
const resumeContainer = document.getElementById("resume-container");
const loginContainer = document.getElementById("login-container");
const resultsContainer = document.getElementById("results");


function codeOnload() {
  if (localStorage.getItem("user") == null) {
    resumeContainer.style.display = "none";
  } else {
    resumeContainer.style.display = "block";
    loginContainer.style.display = "none";
    resultsContainer.style.display = "none";
  };
}
window.onload = codeOnload;


btn_element.addEventListener("click", () => {

  const username = form.username.value;
  const password = form.password.value;

  if (username === 'username' && password === 'password') {
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);
    resumeContainer.style.display = "block";
    loginContainer.style.display = "none";
    resultsContainer.style.display = "none";
  } else {
    errorMessage.textContent = 'Invalid username/password';
  }
});


/*
window.onbeforeunload = function() {
  localStorage.removeItem("user");
  localStorage.removeItem("pass");
  return '';
};
*/
