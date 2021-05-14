var newAccountInformation; // user-entered on the Create an Account page
var submitted; // submit button

document.addEventListener('DOMContentLoaded', () => {
    submitted = document.querySelector('#submit');
    submitted.addEventListener('click', () => {
        console.log("Create an account");
        submit();
    });
});

function clearForm() {
    document.getElementById('email').value = "";
    document.getElementById('name').value = "";
    document.getElementById('password').value = "";
    document.getElementById('repeatpassword').value = "";
} // clearForm()

function createNewAccount() {
    // create a hidden form, add elements for all required fields
    let email = document.createElement('input');
    let form = document.createElement('form');
    let name = document.createElement('input');
    let password = document.createElement('input');
    
    // add all required attributes for the form, email, preferred name, and password
    form.type = "HIDDEN";
    form.method = "post";
    form.action = "/createUserWeb";
    
    email.type = "HIDDEN";
    email.name = "email";
    email.id = "email";
    email.value = newAccountInformation.email;
    
    name.type = "HIDDEN";
    name.name = "name";
    name.id = "name";
    name.value = newAccountInformation.name;
    
    password.type = "HIDDEN";
    password.name = "password";
    password.id = "password";
    password.value = newAccountInformation.password;
    
    // putting together the form data and submitting
    form.appendChild(email);
    form.appendChild(name);
    form.appendChild(password);
    document.body.appendChild(form);
    form.submit();
} // createNewAccount()

function displayPasswordsMismatchedError() {
    document.getElementById('account-creation-error-message-box').style.visibility = "visible";
    document.getElementById('account-creation-error-message').innerText = "The passwords do not match.";
} // displayError()

function getNewInfo() {
    // getting and saving the user's new account information
    let enteredEmail = document.getElementById('email').value;
    let enteredName = document.getElementById('name').value;
    let enteredPassword = document.getElementById('password').value;
    let repeated = document.getElementById('repeatpassword').value;
    console.log(typeof enteredPassword);
    
    if(enteredPassword != repeated) {
        clearForm();
        displayPasswordsMismatchedError();
        return;
    } else {
        console.log(enteredPassword + " = " + repeated);
    }
    
    newAccountInformation = {"name": enteredName, "email": enteredEmail, "password": enteredPassword};
    
    console.log(newAccountInformation);
} // getNewInfo()

function submit() {
    getNewInfo();
    createNewAccount();
} // submit()