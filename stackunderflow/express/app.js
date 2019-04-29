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
	vote: Number,
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

//Post
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


app.post('api/post/vote/:id', (req,res) => {

})

app.get('api/post/:id' ,(req, res) => {
	let post = await Post.find({_id: req.params.id})	
})

app.get('/api/post/list', async (req, res) => {
	let posts = await Post.find();
	if(posts.length <= 0){
		res.status(400)
		res.send('No such post found')
	}
	res.status('200')
	res.send(posts)
});

app.get('/api/post/:id', async (req, res) => {
	res.send(await findPost(req.params.id))
});

//Comments
app.post('api/comment/new/:id', async (req, res) => {
	console.log('asdas')
	const { user, comment } = req.body
	if(!req.body.comment){
		res.status('400')
		res.send('You forgot to enter a body')
	}
	let newComment = Comment({
		user, comment, vote:0, isAnswer:false
	})

	let aPost = await findPost(req.params.id)
	aPost.comments.push(newComment)
	aPost.save();
	res.send('ok')
})


/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));


async function findPost(id){
	let aPost = await Post.findOne({_id:id});
	console.log('asd')
	return aPost;
}

