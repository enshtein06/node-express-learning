const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

//partial piece of website, that i can use in my website
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');//say what view engine i'm gonna use
//hbs stands of handlebarsjs

//logger
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server');
		}
	});

	next();
});//register expressMiddleWare
/* .use fired when page are loaded */
/* Takes 1 func!!! next uses to say that app should continue to run*/

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/ // stop the site

app.use(express.static(__dirname + '/public')); //give access to public folder
/* I can get those file by typing localhost:3000/index.html*/

//takes 2 arguments first is: name of the argument; second is: function to use 
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

//apply toUpperCase to text????? Applied in home.hbs file
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	//res.send('<h1>Hello express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'You are welcome on my website'
		//currentYear: new Date().getFullYear() ??? I can past this data to partials and use them to render my page
	})
});

app.get('/about', (req, res) => {
	//.render() lets us any template i've set up as hbs format
	//.render() arguments is a file with page and object which lets us data to use
	res.render('about.hbs', {
		pageTitle: 'About page'
	})
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	})
});

app.get('/bad', (req, res) => {

	//.send() method lets us to send some info to {bad} address
	res.send({
		error: 404,
		message: 'Unable to fulfill your request'
	})
});

//listen port 3000 of localhost
app.listen(port, () => {
	console.log(`Server in up on port ${port}`)
});