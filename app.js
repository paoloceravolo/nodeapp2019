const express = require('express');
const port = 3003;
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// view engine setupe Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, './public')));

var routesIndex = require('./routes/index.js');
var routesCsJSON = require('./routes/centriJSON.js');

app.get("/", routesIndex);

app.get("/cs/:centro", function(req,res){
	var centro = req.params.centro;
	res.send('Centro Sportivo ' + centro);
});

app.use("/cs-json", routesCsJSON);



// app.get("*", function(req,res){
// 	res.status(404);
// 	//res.send('Sato '+res.statusCode);
// 	throw new Error('la chiamata con ' +req.url+'ha genarato lo stato'+res.statusCode);
// });

app.use(function(err,req,res,next){
	console.log(err.message);
	res.json({'error': err.message});
});




app.listen(port,function(){
	console.log('Server in esecuzione');
});

module.exports = app;