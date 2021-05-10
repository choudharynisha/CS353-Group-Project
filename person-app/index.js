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

const path = require('path');

//////////////////
// navigate to health tracker
app.use(express.static(path.join (__dirname,'/public/')));
// app.use('/', (req, res) => { res.sendFile(path.join(__dirname, '/public/index.html')) } );

app.use(express.static(path.join(__dirname,'/tr')));

app.post('/tracker', (req, res) => {
    res.sendFile(path.join(__dirname, '/tr/tracker.html'));
});

app.post('/DailyGoals', (req, res) => {
    res.sendFile(path.join(__dirname, '/tr/goalCreator.html'));
});



/// endpoints for web
app.use('/createTrackerData', (req, res) => {
    let temp = JSON.parse(req.body.trackers); 
    console.log(temp); 
    
    var newDaily = new Daily ({
        userID: req.body.userID,
        date: req.body.date,
        trackers: temp, 
        // req.body.trackers,
    });
    
    console.log(req.body.userID);
    console.log(req.body.date);
    console.log(req.body.trackers);
    
    newDaily.save((err) => {
        if(err) {
                res.type('html').status(200);
                res.write('Failure to add the Daily to the database: ' + err);
                console.log(err);
                res.end();
        } else {
                //res.send('Success');
                res.sendFile(path.join(__dirname,'/tr/tracker.html'));
                console.log('Success')
        }
    })
});


app.post('/createJournalWeb', (req, res) => {
    var newJournal = new Journal ({
        userID: req.body.userID,
        date: req.body.date,
        journalEntry: req.body.journalEntry
    });
    
    newJournal.save((err) => {
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Journal to the database: ' + err);
            console.log(err);
            res.end();
        } else {
            res.sendFile(path.join(__dirname,'/public/Journal/journal.html'));
        }
    })
})

app.post('/createGoalWeb', (req, res) => {
    var newGoal = new Goal ({
        userID: req.body.userID,
        type: req.body.type,
        description: req.body.description
    });
    
    newGoal.save((err) => {
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Goal to the database: ' + err);
            console.log(err);
            res.end();
        } else {
            res.sendFile(path.join(__dirname,'/tr/goalCreator.html'));
        }
    })
})



/***************************************/

// endpoint for creating a new User
app.post('/createUser', (req, res) => {
        // construct the User from the form data which is in the request body
        var newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            happyList: req.body.happyList
        });
        
        // save the User to the database 
        newUser.save( (err, user) => { 
            if(err) {
                //res.type('html').status(200);
                if (err.code === 11000){
                    res.send({"error" : "emailAlreadyExists"});
                }
                else {
                    res.send({"error" : "failureToAddUser"});
                    
                }
                console.log(err);
                
            } else {
                //https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose/47002504
                console.log(user._id);
                res.send({"success" : "Success", "id" : user._id});
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
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Daily to the database: ' + err);
            console.log(err);
            res.end();
        } else {
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
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Journal to the database: ' + err);
            console.log(err);
            res.end();
        } else {
            res.send('Success');
        }
    })
})

app.post('/createGoal', (req, res) => {
    var newGoal = new Goal ({
        userID: req.body.userID,
        type: req.body.type,
        description: req.body.description
    });
    
    newGoal.save((err) => {
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Goal to the database: ' + err);
            console.log(err);
            res.end();
        } else {
            res.send('Success');
        }
    })
})

// used for logging in
// returned object can be used to check password (very unsafe and cursed)
app.get('/getUser', (req, res) => {
    // construct the query object
    let queryObj = {};
    
    if(req.query.email) {
        queryObj = { "email" : req.query.email };
    }
    
    User.findOne(queryObj, (err, users) => {
        if(err) {
            console.log('Failure to retrieve the User from the database: ' + err);
            res.json({"error":"FailureToReturnUser"});
        } else if(users == null) {
            console.log('No match found in Users');
            res.json({"error":"EmailNotFound"});
        } else {
            console.log("Success found user.")
            res.json(users);
        }
    })
})

app.get('/getDailies', (req, res) => {
    // construct the query object
    let queryObj = {};
    
    if(req.query.userID && req.query.date) {
        queryObj = { 
                    "userID" : req.query.userID,
                    "date" : {$gte : req.query.date}
                   };
    }
    
    Daily.find(queryObj, (err, dailies) => {
        if(err) {
            console.log('Failure to retrieve the Daily/ies from the database: ' + err);
            res.json({});
        } else if(dailies.length == 0) {
            console.log('No match found in Dailies');
            res.json({});
        } else {
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

app.get('/getJournals', (req, res) => {
    // construct the query object
    let queryObj = {};
    
    if(req.query.userID && req.query.date) {
        queryObj = { 
                    "userID" : req.query.userID,
                    "date" : {$gte : req.query.date}
                   };
    }
    
    Journal.find(queryObj, (err, journals) => {
        if(err) {
            console.log('Failure to retrieve the Journal/s from the database: ' + err);
            res.json({});
        } else if(journals.length == 0) {
            console.log('No match found in Journals');
            res.json({});
        } else {
            // construct an array out of the result
            let returnArray = [];
            journals.forEach( (daily) => {
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
    
    if(req.body.userID) {
        queryObj = { "userID" : req.body.userID};
    }
    
    Goal.find(queryObj, (err, goals) => {
        if(err) {
            console.log('Failure to retrieve the Goal(s) from the database: ' + err);
            res.json({});
        } else if(goals.length == 0) {
            console.log('No match found in Goals');
            res.json({});
        } else {
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

/*************************************************/

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );

app.listen(3000,  () => {
    console.log('Listening on port 3000');
});