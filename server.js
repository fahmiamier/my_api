// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds012188.mlab.com:12188/nodeapi'); // connect to our database

var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

router.post('/body', function(req, res) {
    req.body.class = "A";
    res.json(req.body);   
});

router.post('/penjumlahan', function(req, res) {
    var angka1 = req.body.angka1;
    var angka2 = req.body.angka2;
    var hasil = angka1 + angka2;
    res.json(hasil);   
});

router.delete('/body', function(req, res) {
    delete req.body.name;
    res.json(req.body);   
});

router.put('/body', function(req, res) {
    var user = {
        "name": "John",
        "age": 28,
        "class": "B"
    }
    user.age=req.body.age;
    res.json(user);   
});