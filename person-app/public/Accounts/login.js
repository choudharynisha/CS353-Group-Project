var loginAttempt; // user-entered on the Login page
var submitted; // submit button

document.addEventListener('DOMContentLoaded', () => {
    submitted = document.querySelector('#submit');
    submitted.addEventListener('click', () => {
        console.log("Log In");
        submit();
    });
});

function clearForm() {
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
} // clearForm()

function displayUnenteredEmailError() {
    document.getElementById('login-error-message-box').style.visibility = "visible";
    document.getElementById('login-error-message').innerText = "Please enter your email.";
} // displayUnenteredEmailError()

function displayUnenteredFieldsError() {
    document.getElementById('login-error-message-box').style.visibility = "visible";
    document.getElementById('login-error-message').innerText = "Please enter both an email and a password.";
} // displayUnenteredFieldsError()

function displayUnenteredPasswordError() {
    document.getElementById('login-error-message-box').style.visibility = "visible";
    document.getElementById('login-error-message').innerText = "Please enter your password.";
} // displayUnenteredPasswordError()

function login() {
    // create a hidden form, add elements for all required fields
    let email = document.createElement('input');
    let form = document.createElement('form');
    let password = document.createElement('input');
    
    // add all required attributes for the form, email, preferred name, and password
    form.type = "HIDDEN";
    form.method = "post";
    form.action = "/weblogin";
    
    email.type = "HIDDEN";
    email.name = "email";
    email.id = "email";
    email.value = loginAttempt.email;
    
    password.type = "HIDDEN";
    password.name = "password";
    password.id = "password";
    password.value = loginAttempt.password;
    
    // putting together the form data and submitting
    form.appendChild(email);
    form.appendChild(password);
    document.body.appendChild(form);
    form.submit();
} // login()

function getLoginInfo() {
    // getting and saving the user's new account information
    let enteredEmail = document.getElementById('email').value;
    let enteredPassword = document.getElementById('password').value;

    if((enteredEmail == '') && (enteredPassword == '')) {
        displayUnenteredFieldsError();
        return;
    }

    if(enteredEmail == '') {
        displayUnenteredEmailError();
        return;
    }

    if(enteredPassword == '') {
        displayUnenteredPasswordError();
        return;
    }
    
    loginAttempt = {email: enteredEmail, password: enteredPassword};
    
    console.log(loginAttempt);
} // getLoginInfo()

function submit() {
    getLoginInfo();
    login();
} // submit()
