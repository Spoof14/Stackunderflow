import React, { PureComponent } from 'react'
import Api from '../utility/Api'

export default class Post extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {

		}
		this.Api = new Api(this)
	}

	componentDidMount(){
		this.Api.getPostById(this.props.match.params.id)
	}

	render() {
		return (
			<div>
				<div style={{background:'#FEFEFE', width:'40vw', height:'40vh', margin:'auto'}}>
					{this.props.match.params.id}
				</div>
				
			</div>
		)
	}
}
