var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmsc353-team:cmsc353@cmsc353-project.4mlo7.mongodb.net/JournalProjectData?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    happyList : {type: Array}
});

module.exports = mongoose.model('User', userSchema);