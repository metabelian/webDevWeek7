var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//post stuff

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebar stuff
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/',function(req,res){
  res.type('text/plain');
  res.send("Welcome to Chris' get and post server!");
});


function getRand()
{
	var rand = {};
	rand.random = Math.random();
	return rand;
}

app.get('/random', function(req,res)
{
		res.render('random', getRand());
});


app.get('/getStuff', function(req,res)
{
	var qArray = [];
	for (var p in req.query)
	{
			qArray.push({'name':p, 'value':req.query[p]});
	}
	
	var context = {};
	context.qList = qArray;
	res.render('get', context);
});

app.post('/postStuff', function(req, res)
{
	var pArray = [];
	
	for (var p in req.body)
	{
		pArray.push({'name':p, 'value':req.body[p]});
	}
	
	var context = {};
	context.pList = pArray;
	res.render('post', context);
});


//copied error messages from examples
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});