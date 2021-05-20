const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff:"This is something"
    });
});


// Set static folder 
app.use(express.static(path.join(__dirname,'public')));




app.listen(PORT, () => console.log('Server listen on port 5000'))