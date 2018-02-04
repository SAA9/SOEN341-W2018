// Set up express, body parser, and ejs
var express = require("express");
var app = express();
var util = require('util');
var bodyParser = require("body-parser");
var date = require('date-and-time');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Links express to the stylesheets
app.use(express.static(__dirname + "/public"));


/* INSERTS PAGE GET/POST CONNECTIONS HERE */
app.get("/question_forum/:q_id", function(req, res) {
	
	// Verify that the question id is a number
	if (isNaN(req.params.q_id))
	{
		res.render('invalid_page', null);
		return;
	}
	
	// Get the entire page's data --> var outputObj = get_forum(question_id);
	var outputObj = {
		title: "What is polymorphism in Java, and how can I test it?",
		body: "I often hear my professor lecture about polymorphism, but I think I missed the class where he " +
			"explained what it was (the snooze button :/ ). Can someone refresh me on the ins-and-outs of polymorphism, " +
			"specifically, its implementation within java",
		user_asked: "Anthony2112",
		question_pts: 10,
		date_asked: date.format(new Date(), 'DD/MM/YYYY'),
		time_asked: date.format(new Date(), 'h:m A').toUpperCase(),
		answers:      
			(function() {
				arr = [];
				var num_answers = Math.round(Math.random()*15)+1;
				for (var i = 0; i<num_answers; i++)
					arr.push(
					{
						answer: "From what I remember in my COMP 249 class @ Concordia University," +
						"polymorphism is when an object takes on different forms based on the left-hand-side" +
						"type and the right-hand-side object.",
						user_answered: (function() {
							var size = Math.round(Math.random()*10) + 1; // Size of username
							var uname = new String("");
							
							for(var s = 0; s<size; s++)
								uname = uname.concat(
								String.fromCharCode(Math.round(Math.random()*42) + 48)
								);
							
							return uname;
						})(),
						answer_pts: Math.round(Math.random()*1000 + 1),
						date_answered: date.format(new Date(), 'DD/MM/YYYY'),
						time_answered: date.format(new Date(), 'h:m A').toUpperCase()
					});
		
				return arr
			})()
	};
	
	
	
	console.log("Requested Question Forum q_id = " + util.inspect(req.params));
	// if q_id is valid
	res.render('forum_page.ejs', {forum: outputObj});
	// else
	// res.render('invalid_page.ejs', null);
	
});



// Catches invalid URL requests
app.get("*", function(req, res) {
	res.render('invalid_page', null);
}) ;

// Makes the server listen for req/res - http://localhost:3000
app.listen(3000, function() {
	console.log("Server Running on Port 3000");
	console.log("Working Directory: " + __dirname);
});