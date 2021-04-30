function addEntry() {
    // getting and saving the user's entry
    let form = new FormData(document.getElementById('entryForm'));
    
    for(object of form) {
        // object = two indices of "entry" and whatever the inserted object was
        let input = JSON.stringify(object[1]);
        let today = JSON.stringify(new Date());
        let entry = '{ "userID":"1234", ' +
            '"date":' + today + ', ' +
            '"journalEntry":' + input + '}';
        entry = JSON.parse(entry);
        console.log(entry);
    }
} // addEntry()