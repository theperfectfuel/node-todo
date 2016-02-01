
var express = require("express");
var app = express();
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');

var data = [];
var counter = 0;

app.set('view engine', 'hbs');
app.engine('hbs', expressHbs( {
    extname: 'hbs'
}));

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(3000, function(err) {
	if (err) {
		console.log('Server is not working ');
	} else {
		console.log('Server works')
	} 
});

app.post("/client_to_server", function(req, res) {
	counter += 1;
	req.body.id = counter;
	console.log(req.body);
	data.push(req.body);
	res.redirect("/");
});

app.post("/update/:id", function(req, res) {
	var referenceID = +req.params.id;
	data.forEach(function(val, index, arr) {
		if (val.id === referenceID) {
			val.userData = req.body.userData
		}
	});
	res.redirect("/")
});

app.get("/delete/:id", function(req, res) {
	var toDelete = +req.params.id;
	data.forEach(function(val, index, arr) {
		if (val.id === toDelete) {
			data.splice(index, 1);
		};
	});
	res.redirect("/");
});

app.get("/edit/:id", function(req, res) {
	res.render("edit", {
		id: req.params.id
	})
	console.log(req.params)
});

app.get("/", function(req, res) {
	res.render("index", { 
		item: data
		});
});

/*
app.get("*", function(req, res) { 
	res.redirect("/")
});
*/