var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmsc353-team:cmsc353@cmsc353-project.4mlo7.mongodb.net/JournalProjectData?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var dailySchema = new Schema({
    userID: {type: String, required: true},
    date: {type: Date, required: true},
    trackers: {type: Object, required: true},
    journalEntry: {type: String}
});

module.exports = mongoose.model('Daily', dailySchema);