import'react-testing-library/cleanup-after-each';
// this adds jest-dom's custom matchers
import'jest-dom/extend-expect';

// some global test data for all your tests
global.posts = [
	{
		title:'title test',
		_id:123,
		votes:10,
		question:' a question test',
		tags:['test', 'js']
	},
	{
		title:'title test2',
		_id:13,
		votes:110,
		comment:' a comment test'
	},

];

