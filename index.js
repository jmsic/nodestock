const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));


// API KEY pk_f2a0fe2321054849a4bafaa31251f534



function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_f2a0fe2321054849a4bafaa31251f534',
		{ json: true}, (err, res, body) => {
			if (err) {return console.log(err);}
			if (res.statusCode === 200) {
				finishedAPI(body);
			};
		}
	);
};





// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
	    	stock:doneAPI
	    });
	}, 'tsla');    
});

// Set handlebars index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker;
		res.render('home', {
	    	stock:doneAPI,	    	
	    });
	}, req.body.stock_ticker);    
});



// create about page routes
app.get('/about.html', function (req, res) {
    res.render('about');
});


// Set static folder 
app.use(express.static(path.join(__dirname,'public')));




app.listen(PORT, () => console.log('Server listen on port 5000'))