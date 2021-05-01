// set up Express
var express = require('express');
var app = express();

// set up BodyParser
/*var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));*/
// set up BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var User = require('./User.js');
var Daily = require('./Daily.js');
var Goal = require('./Goal.js');
var Journal = require('./Journal.js');

/***************************************/

// endpoint for creating a new person
// this is the action of new user form
app.post('/createUser', (req, res) => {
	// construct the User from the form data which is in the request body
	var newUser = new User ({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		happyList: req.body.happyList
	});

	// save the User to the database 
	newUser.save( (err) => { 
		if (err) {
		    res.type('html').status(200);
		    res.write('Failure to add the User to the database: ' + err);
		    console.log(err);
		    res.end();
		}
		else {
		    // display the "successfull created" message
		    res.send('Success');
		}
	    } ); 
	}
);

app.post('/createDaily', (req, res) => {
	var newDaily = new Daily ({
		userID: req.body.userID,
		date: req.body.date,
		trackers: req.body.trackers,
	});

	console.log(req.body.userID);
	console.log(req.body.date);
	console.log(req.body.trackers);

	newDaily.save((err) => {
		if (err) {
			res.type('html').status(200);
		    res.write('Failure to add the Daily to the database: ' + err);
		    console.log(err);
		    res.end();
		}
		else {
			res.send('Success');
			console.log('Success')
		}
	})
})

app.post('/createJournal', (req, res) => {
	var newDaily = new Journal ({
		userID: req.body.userID,
		date: req.body.date,
		journalEntry: req.body.journalEntry
	});

	newDaily.save((err) => {
		if (err) {
			res.type('html').status(200);
		    res.write('Failure to add the Journal to the database: ' + err);
		    console.log(err);
		    res.end();
		}
		else {
			res.send('Success');
		}
	})
})

app.post('/createGoal', (req, res) => {
	var newGoal = new Goal ({
		userID: req.body.userID,
		type: req.body.type,
		description: req.body.description,
		journalEntry: req.body.journalEntry
	});

	newGoal.save((err) => {
		if (err) {
			res.type('html').status(200);
		    res.write('Failure to add the Goal to the database: ' + err);
		    console.log(err);
		    res.end();
		}
		else {
			res.send('Success');
		}
	})
})

app.use('/getUser', (req, res) => {
	// construct the query object
	let queryObj = {};
	if (req.body.email) {
		queryObj = { "email" : req.body.email };
	}
	User.findOne(queryObj, (err, users) => {
		if (err) {
			console.log('Failure to retrieve the User from the database: ' + err);
		    res.json({});
		}
		else if (users.length == 0){
			console.log('No match found in Users');
			res.json({});
		}
		else {
			res.json(users);
		}
	})
})

app.use('/getDailies', (req, res) => {
	// construct the query object
	let queryObj = {};

	if (req.body.userID) {
		queryObj = { "userID" : req.body.userID};
	}
	if (req.body.date){
		queryObj = { "date" : req.body.date};
	}

	Daily.find(queryObj, (err, dailies) => {
		if (err) {
			console.log('Failure to retrieve the Daily/ies from the database: ' + err);
		    res.json({});
		}
		else if (dailies.length == 0){
			console.log('No match found in Dailies');
			res.json({});
		}
		else {
			// construct an array out of the result
		    let returnArray = [];
		    dailies.forEach( (daily) => {
			    returnArray.push(daily);
			});
		    // send it back as JSON Array
		    res.json(returnArray); 
		}
	})
})

app.use('/getGoals', (req, res) => {
	// construct the query object
	let queryObj = {};

	if (req.body.userID) {
		queryObj = { "userID" : req.body.userID};
	}

	Goal.find(queryObj, (err, goals) => {
		if (err) {
			console.log('Failure to retrieve the Goal(s) from the database: ' + err);
		    res.json({});
		}
		else if (goals.length == 0){
			console.log('No match found in Goals');
			res.json({});
		}
		else {
			// construct an array out of the result
		    let returnArray = [];
		    goals.forEach( (goal) => {
			    returnArray.push(goal);
			});
		    // send it back as JSON Array
		    res.json(returnArray); 
		}
	})
})

//TODO: finish this endpoint
app.use('/updateHappy', (req, res) => {
	let queryObj = {};
	let action = null;//add, update, delete, or delete all
	let title = null;
	let happyList = null;

	if (req.body.userID && req.body.action) {
		queryObj = { "userID" : req.body.userID};
		action = req.body.action;
	}
	if (req.body.action !== "delete all"){
		title = req.body.title;
	}

	happyList = User.find(queryObj, (err, users) => {
		if (err) {
			console.log('Failure to retrieve the User from the database: ' + err);
		    res.json({});
		}
	})

})


/*// endpoint for showing all the people
app.use('/all', (req, res) => {
    
	// find all the Person objects in the database
	schemas.find( {}, (err, persons) => {
		if (err) {
		    res.type('html').status(200);
		    console.log('uh oh' + err);
		    res.write(err);
		}
		else {
		    if (persons.length == 0) {
			res.type('html').status(200);
			res.write('There are no people');
			res.end();
			return;
		    }
		    else {
			res.type('html').status(200);
			res.write('Here are the people in the database:');
			res.write('<ul>');
			// show all the people
			persons.forEach( (person) => {
				res.write('<li>Name: ' + person.name + '; age: ' + person.age + '</li>');
			    });
			res.write('</ul>');
			res.end();
		    }
		}
	    }).sort({ 'age': 'asc' }); // this sorts them BEFORE rendering the results
    });*/

// endpoint for accessing data via the web api
// to use this, make a request for /api to get an array of all Person objects
// or /api?name=[whatever] to get a single object
app.use('/api', (req, res) => {

	// construct the query object
	var queryObject = {};
	if (req.query.name) {
	    // if there's a name in the query parameter, use it here
	    queryObject = { "name" : req.query.name };
	}
    
	Person.find( queryObject, (err, persons) => {
		console.log(persons);
		if (err) {
		    console.log('uh oh' + err);
		    res.json({});
		}
		else if (persons.length == 0) {
		    // no objects found, so send back empty json
		    res.json({});
		}
		else if (persons.length == 1 ) {
		    var person = persons[0];
		    // send back a single JSON object
		    res.json( { "name" : person.name , "age" : person.age } );
		}
		else {
		    // construct an array out of the result
		    var returnArray = [];
		    persons.forEach( (person) => {
			    returnArray.push( { "name" : person.name, "age" : person.age } );
			});
		    // send it back as JSON Array
		    res.json(returnArray); 
		}
		
	    });
    });




/*************************************************/

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );

app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
