var submitting; // submit button
var entry; // user entry
var clearing; // clear button

document.addEventListener('DOMContentLoaded', () => {
    // get ready to get the entry and add it to the database
    submitting = document.querySelector('#submit');
    clearing = document.querySelector('#clear');
    console.log(window.localStorage.getItem("userID"));
    
    submitting.addEventListener('click', () => {
        console.log("Add an entry");
        submit();
    });
    
    clearing.addEventListener('click', () => {
        console.log("Cleared");
        document.getElementById("entry").value = "";
    })
});

function addEntry() {
    // create a hidden form, add elements for all required fields
    let form = document.createElement('form');
    let userEntry = document.createElement('input');
    let today = document.createElement('input');
    let user = document.createElement('input');
    
    // add all required attributes for the form, user entry, current date, and user ID
    form.type = "HIDDEN";
    form.method = "post";
    form.action = "/createJournalWeb";
    
    userEntry.type = "HIDDEN";
    userEntry.name = "journalEntry";
    userEntry.value = entry.entry;
    
    today.type = "HIDDEN";
    today.name = "date";
    today.id = "date";
    today.value = new Date();
    
    user.type = "HIDDEN";
    user.name = "userID";
    user.id = "userID";
    user.value = entry.userID;
    
    // putting together the form data and submitting
    form.appendChild(today);
    form.appendChild(user);
    form.appendChild(userEntry);
    document.body.appendChild(form);
    form.submit(); 
} // addEntry()

function getEntry() {
    // getting and saving the user's entry
    let form = new FormData(document.getElementById('entryForm'));
    
    for(object of form) {
        // object = two indices of "entry" and whatever the inserted object was
        let input = JSON.stringify(object[1]);
        let today = JSON.stringify(new Date());
        
        entry = '{ "userID":"1234", ' +
            '"date":' + today + ', ' +
            '"entry":' + input + '}';
        entry = JSON.parse(entry);
        
        console.log(entry);
    }
} // getEntry()

function submit() {
    getEntry();
    addEntry();
} // submit()