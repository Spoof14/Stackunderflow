import React, { PureComponent } from 'react'
import Api from '../utility/Api'
import List from '../utility/List';
import TagListItem from './TagListItem';
import PostComment from './PostComment';
import Header from '../header/Header';

export default class Post extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			name:'',
			answer:''
		}
		this.Api = new Api(this)
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount(){
		let post = await this.Api.getPostById(this.props.match.params.id)
		this.setState({
			post: post
		})
	}

	onClick(commentId, value){
		this.Api.vote(this.props.match.params.id, value, commentId);
		this.setState(state => {
			if(commentId){
				 let items = state.post.comments.map(com => {
					if(com._id === commentId){
						com.votes += value
					}
					return com
				})
				
				return {
					post:{
						...state.post,
						comments:items
					}
				}
			}
			return{
				post:{
					...state.post,
					votes:state.post.votes + value
				}
			}
		})
	}

	async onSubmit(e){
		e.preventDefault()
		let post = await this.Api.answer(this.state.name, this.state.answer, this.props.match.params.id);
		post = await post.json();
		console.log(post)
		this.setState({
			post:post
		})
	}

	
	onChange(e){
		let { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	render() {
		if(!this.state.post){
			return <div>...Loading</div>
		}
		return (
			<div className="container">
			{console.log('Hvorfor builder du ikke?')}
				<Header></Header>
				<PostComment item={this.state.post} onClick={(value) => this.onClick(value)}></PostComment>

				<List Component={PostComment} items={this.state.post.comments} onClick={(commentId, value, ) => this.onClick(commentId, value)}></List>

				<div >
					<form style={{maxWidth:'50%', margin: 'auto', display:'flex', flexDirection:'column', alignItems:'center'}} 
						 onSubmit={this.onSubmit}>
					
						<label style={{color:'white', width:'5rem'}}>
							Name:
							<input name="name" onChange={this.onChange} value={this.state.name}></input>
						</label>
						<label style={{color:'white', width:'5rem'}}>
							Answer:
							<textarea name="answer" onChange={this.onChange}  value={this.state.answer}>

							</textarea>
						</label>
						
						<input type="submit" value="ANSWER!" style={{marginTop:'2rem'}} onSubmit={this.onSubmit}></input>
					</form>
				</div>
			</div>
		)
	}
}
