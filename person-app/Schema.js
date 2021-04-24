var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmsc353-team:cmsc353@cmsc353-project.4mlo7.mongodb.net/JournalProjectData?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    happyList : {type: Array}
});

var goalSchema = new Schema({
    userID: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true}
});

var dailySchema = new Schema({
    userID: {type: String, required: true},
    date: {type: Date, required: true},
    trackers: {type: Object, required: true},
    journalEntry: {type: String}
});

// export personSchema as a class called Person
module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Goal', goalSchema);
module.exports = mongoose.model('Daily', dailySchema);