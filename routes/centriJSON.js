var express = require('express');
var router = express.Router();

var data = require('../public/5bbn-8w23.json')

function isBig(item){
	console.log(item.id);
	return item.provincia == 'PV';
}

function filterItems(arr, att, query){
	return arr.filter(function(item){
		return item[att].toLowerCase().indexOf(query.toLowerCase()) !== -1;
	});
}

router.use(function timeLog(req,res,next){
	console.log('centriJSON ' + Date.now());
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if(Array.isArray(data)){
		res.send(data);
	}else{res.send('Data is not well structured')};
});

router.get('/filter/:sport', function(req, res, next) {
	if(Array.isArray(data)){
		let arr = data;
		//res.send(arr.filter(isBig));
		res.send(filterItems(arr, 'descrizione_struttura', req.params.sport));
	}else{res.send('Data is not well structured')};
});

module.exports = router;
