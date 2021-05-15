// set up Express
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
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

app.use(express.static(path.join(__dirname,'/views/')));
app.use(express.static(path.join(__dirname,'/tr')));
app.use(express.static(path.join(__dirname,'/Dashboard/visual.js')));

app.post('/tracker', (req, res) => {
    res.sendFile(path.join(__dirname, '/tr/tracker.html'));
});

// create goals 
app.post('/DailyGoals', (req, res) => {
    res.sendFile(path.join(__dirname, '/tr/goalCreator.html'));
});

// retrieve goals and dalies 
app.post('/Dashboard', (req, res) => {
    // construct the query object
    let queryObj = {};

    let data = [null,null];
   
    if(req.query.userID && req.query.date) {
        queryObj = 
        { 
                "userID" : req.query.userID,
                "date" : {$gte : req.query.date}
        };
    }

    Daily.find(queryObj, (err, dailies) => {
        if(err) {
            console.log('Failure to retrieve the Daily/ies from the database: ' + err);
            res.json([{"error" : "FailureToReturnDailies"}]);
        } else if(dailies.length == 0) {
            console.log('No match found in Dailies');
            res.json([{"error" : "DailiesNotFound"}]);
        } else {
            // construct an array out of the result
            let returnArray = [];
            dailies.forEach( (daily) => {
                returnArray.push(daily);
            });

            // send it back as JSON Array
            console.log("Sending now");
            
            let values = []; 
            

            for(let i =0; i < returnArray.length; i++) {
                let tempvalues =[]; 
                let  tem = returnArray[i].trackers; 
                
                // if( returnArray[i].hasOwnProperty(returnArray[i].trackers) )
                //  {
                    if( i === 0) {
                        tempvalues.push(" ") ;
                    }
                  
                    // console.log(returnArray[i].date.toLocaleDateString()); 
                    tempvalues.push(returnArray[i].date) ;
                    for(item in returnArray[i].trackers) {
                        var fillin =0; 
                        if(item === 'energy') {
                            tempvalues.push(  returnArray[i].trackers.energy); 
                            fillin = fillin +1; 
                        } else if(item === 'depression') {
                            tempvalues.push( returnArray[i].trackers.depression);
                            fillin = fillin +1; 
                        } else if(item === 'anxiety') {
                            tempvalues.push( returnArray[i].trackers.anxiety);
                            fillin = fillin +1; 
                        } else if(item === 'stress') {
                            tempvalues.push( returnArray[i].trackers.stress);
                            fillin = fillin +1; 
                        } else if(item === 'motivation') {
                            tempvalues.push(  returnArray[i].trackers.motivation);
                            fillin = fillin +1; 
                        } else {
                            tempvalues.push(item); 
                            fillin = fillin +1; 
                        }

                        if(fillin === 0) {
                            tempvalues.push(item)
                        }
                    }
                    
                    //console.log(tempvalues); 
                    values.push(tempvalues); 
                // }
                
                for(let i = 0; i < returnArray.length; i++) {
                    let tempvalues =[]; 
                    let tem = returnArray[i].trackers;

                    for(item in returnArray[i].trackers) {
                        if(item === 'energy') {
                            tempvalues.push(returnArray[i].trackers.energy)
                        } else if(item === 'energy') {
                            tempvalues.push(returnArray[i].trackers.energy)
                        }
                    }
                    //console.log(tempvalues); 
                }
            }
            
            data[0] = values;    
        }
    }) 
   

    // get goals 
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
                // only showing Daily goals
                //console.log(goal); 
                returnArray.push(goal);
                
            });
            // send it back as JSON Array
            // res.json(returnArray);
            // console.log(returnArray); 
            // data.push(returnArray)
            // res.cookie = ('user', returnArray); 
            data[1]= returnArray; 
            // console.log(data); 
            res.render('daily_dashboard', {test : data});
        }
    })
});

// endpoints for web
app.use('/createTrackerData', (req, res) => {
    let temp = JSON.parse(req.body.trackers); 
    console.log(temp); 
    
    var newDaily = new Daily ({
        userID: req.body.userID,
        date: req.body.date,
        trackers: temp, 
        // req.body.trackers,
    });
    
    newDaily.save((err) => {
        if(err) {
            res.type('html').status(200);
            res.write('Failure to add the Daily to the database: ' + err);
            console.log(err);
            res.end();
        } else {
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
            res.redirect('/');
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

// endpoint for creating a new User in the web app
app.post('/createUserWeb', (req, res) => {
    // construct the User from the form data which is in the request body
    var newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    // save the User to the database 
    newUser.save( (err, user) => { 
        if(err) {
            if(err.code === 11000){
                res.send({"error" : "emailAlreadyExists"});
            } else {
                console.log(err.code);
                console.log(err);
                res.send(error.code, error);
            }
            
            console.log(err);
        } else {
            // https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose/47002504
            console.log("path.__dirname = " + path.__dirname);
            res.sendFile('localhost:3000/public/index.html?userid=' + user._id);
            console.log(user._id);
        }
    } );
});

app.post('/weblogin', (req, res) => {
    let queryUser = {};
    
    if(req.body.email && req.body.password) {
        queryUser = {
            "email": req.body.email,
            "password": req.body.password
        };
    }
    
    console.log(queryUser.email);
    console.log(queryUser.password);
    
    User.findOne(queryUser, (error, user) => {
        if(error) {
            console.log('The email and/or password provided as credentials are invalid – ' + error);
            res.json({});
        } else if(user.length == 0) {
            console.log('The email and/or password entered as credentials are invalid.');
            res.json({});
        } else {
            // the login is successful
            console.log("successful login");
            res.cookie = ('user', user._id);
            res.sendFile('/public/index.html');
        }
    })
})

//*******
app.post('/viewjournals', (req, res) => {
    let queryObj = {};
    
    if(req.query.userID && req.query.date) {
        queryObj = { 
            "userID": req.query.userID,
            "date": {$gte : req.query.date}
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
            
            res.render('vJournals', {test :returnArray});
        }
    })
});

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
                // res.type('html').status(200);
                if (err.code === 11000){
                    res.send({"error" : "emailAlreadyExists"});
                } else {
                    res.send({"error" : "failureToAddUser"});
                    
                }
                
                console.log(err);
            } else {
                // https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose/47002504
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
            res.json([{"error" : "FailureToReturnDailies"}]);
        } else if(dailies.length == 0) {
            console.log('No match found in Dailies');
            res.json([{"error" : "DailiesNotFound"}]);
        } else {
            // construct an array out of the result
            let returnArray = [];
            dailies.forEach( (daily) => {
                returnArray.push(daily);
            });
            // send it back as JSON Array
            console.log("Sending now");
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
            res.json([]);
        } else if(journals.length == 0) {
            console.log('No match found in Journals');
            res.json([]);
        } else {
            // construct an array out of the result
            let returnArray = [];
            journals.forEach( (journal) => {
                console.log(journal);
                returnArray.push(journal);
            });
            // send it back as JSON Array
            res.json(returnArray); 
        }
    })
})

app.use('/getGoals', (req, res) => {
    // construct the query object
    let queryObj = {};
    
    if(req.query.userID) {
        queryObj = { "userID" : req.query.userID};
    }
    
    Goal.find(queryObj, (err, goals) => {
        if(err) {
            console.log('Failure to retrieve the Goal(s) from the database: ' + err);
            res.json([]);
        } else if(goals.length == 0) {
            console.log('No match found in Goals');
            res.json([]);
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