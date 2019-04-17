import React, { Component } from 'react';
import Login from './components/login/Login';
import './App.css'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Home from './Home';
import Post from './components/post/Post';

class App extends Component {
	API_URL = process.env.REACT_APP_API_URL;

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			loggedIn: true,
		};

		this.onChange = this.onChange.bind(this);
		this.login = this.login.bind(this);
	}

	login(e) {
		e.preventDefault();
		this.setState({ loggedIn: true })
	}
	onChange(e) {
		let { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	render() {
		let { loggedIn, username, password } = this.state;
		if (loggedIn) {

			return (
				<Router>
					<Route exact path='/' component={Home} />
					<Route path='/questions/:id' component={Post} />
				</Router>

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
