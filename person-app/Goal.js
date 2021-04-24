var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmsc353-team:cmsc353@cmsc353-project.4mlo7.mongodb.net/JournalProjectData?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var goalSchema = new Schema({
    userID: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Goal', goalSchema);