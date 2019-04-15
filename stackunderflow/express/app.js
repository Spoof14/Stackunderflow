/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


/**** Configuration ****/
const appName = "Foobar";
const port = (process.env.PORT || 8080);
const app = express();
mongoose.connect('mongodb://developer:123456q@ds135036.mlab.com:35036/stackunderflow');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static(path.join(__dirname, '../build')));


const commentSchema = new mongoose.Schema({
	comment: String,
	user: String,
	isAnswer: Boolean
});
const postSchema = new mongoose.Schema({
	title: String,
	user: String,
	question: String,
	comments: [commentSchema],
	tags:[String],
	votes: Number,
	answers: Number,
	views: Number
});
let Comment = mongoose.model('Comment', commentSchema);
let Post = mongoose.model('Post', postSchema);



// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

	// intercepts OPTIONS method
	if ('OPTIONS' === req.method) {
		// respond with 200
		console.log("Allowing OPTIONS");
		res.send(200);
	}
	else {
		// move on
		next();
	}
});



/**** Routes ****/
app.post('/api/post/new', (req, res) => {
	if(req.body.title){
		const { title, user, question, tags } = req.body;
		let newPost = new Post({
			title, user, question, tags, comments:[], votes:0, answers:0, views:0
		})
		console.log(req.body)
		newPost.save(err => {
			if(err){
				console.error(err);
				res.status('400');
			} 
			res.status('200')
		})
		res.send('ok')
	}else{
		res.status('400')
		res.send('error')
	}

})

app.get('/api/post/list', async (req, res) => {
	let posts = await Post.find();
	console.log(posts)
	res.status('200')
	res.send(posts)
});


/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));



