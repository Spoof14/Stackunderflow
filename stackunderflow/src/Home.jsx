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
			items:[],
			name:'',
			question:'',
			title:''
		};

		this.Api = new Api(this);
		this.getData = this.getData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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

	onChange(e){
		let { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	async onSubmit(e){
		e.preventDefault()
		let item = await this.Api.newPost(this.state.title, this.state.name, this.state.question)
		item = await item.json();

		this.setState(state => {
			return{
			items:[...state.items, item],
			title:'',
			name:'',
			question:''
			}

		})

	}

	render() {
		let { items } = this.state;
		return (
			<div className="container">
				<Header></Header>
				<List Component={PostListItem} items={items} listName="post-list" history={this.props.history}></List>
				<div >
					<form style={{maxWidth:'50%', margin: 'auto', display:'flex', flexDirection:'column', alignItems:'center'}} 
						 onSubmit={this.onSubmit}>
					
						<label style={{color:'white', width:'5rem'}}>
							Name:
							<input name="name" onChange={this.onChange} value={this.state.name}></input>
						</label>
						<label style={{color:'white', width:'5rem'}}>
							Title:
							<input name="title" onChange={this.onChange}  value={this.state.title}></input>
						</label>
						<label style={{color:'white', width:'5rem'}}>
							Question:
							<textarea name="question" onChange={this.onChange}  value={this.state.question}>

							</textarea>
						</label>
						
						<input type="submit" value="ASK!" style={{marginTop:'2rem'}} onSubmit={this.onSubmit}></input>
					</form>
				</div>
			</div>
		)
	}
}
