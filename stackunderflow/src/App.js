import React, { Component } from 'react';
import Login from './components/login/Login';
import Header from './components/header/Header';
import './App.css'
import List from './components/utility/List';
import PostListItem from './components/post/PostListItem';
import Api from './components/utility/Api';

class App extends Component {
	API_URL = process.env.REACT_APP_API_URL;

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			loggedIn: true,
			items:[]
		};

		this.Api = new Api(this);

		this.onChange = this.onChange.bind(this);
		this.getData = this.getData.bind(this);
		this.login = this.login.bind(this);
	}
	componentDidMount(){
		this.getData();
	}

	async getData() {
		try {
			let items = await this.Api.getPosts();
			console.log(items)
			this.setState({
				items
			})
		} catch (error) {
			console.error("Error when fetching: ", error);
		}
	}

	onChange(e) {
		let { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	login(e) {
		e.preventDefault();
		this.setState({ loggedIn: true })
	}

	render() {
		let { loggedIn, username, password } = this.state;
		if (loggedIn) {
			let { items } = this.state;
			return (
				<div className="container">
					<Header></Header>
					<List Component={PostListItem} items={items} listName="post-list"></List>
				</div>
			)
		}
		return (
			<div className="container">
				<Login onChange={this.onChange} onSubmit={this.login} username={username} password={password}></Login>
			</div>
		);
	}
}

export default App;
