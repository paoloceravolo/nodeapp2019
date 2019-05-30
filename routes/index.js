var express = require('express');
var router = express.Router();

router.use(function timeLog(req,res,next){
	console.log(Date.now());
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {'subtitle': 'Testo scritto con HandleBars'});
});

router.get('/about', function(req, res, next) {
  res.send('Pagina di About');
});


module.exports = router;
