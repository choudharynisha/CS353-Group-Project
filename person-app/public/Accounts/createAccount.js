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

function createNewAccount() {} // createNewAccount()

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
    
    if(enteredPassword != repeated) {
        clearForm();
        displayPasswordsMismatchedError();
        return;
    } else {
        console.log(enteredPassword + " = " + repeated);
    }
    
    newAccountInformation = {name: enteredName, email: enteredEmail, password: enteredPassword};
    
    console.log(newAccountInformation);
} // getNewInfo()

function submit() {
    getNewInfo();
    createNewAccount();
} // submit()