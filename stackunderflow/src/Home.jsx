import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import List from './components/utility/List';
import PostListItem from './components/post/PostListItem';
import Api from './components/utility/Api';

export default class Home extends PureComponent {

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
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
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



	render() {
		let { items } = this.state;
		return (
			<div className="container">
				<Header></Header>
				<List Component={PostListItem} items={items} listName="post-list" history={this.props.history}></List>
			</div>
		)
	}
}
