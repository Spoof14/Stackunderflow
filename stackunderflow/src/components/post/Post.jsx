import React, { PureComponent } from 'react'
import Api from '../utility/Api';

export default class Post extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {

		}
		this.Api = new Api(this);
	}

	componentDidMount(){
		this.Api.getPostById(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				{this.props.match.params.id}
			</div>
		)
	}
}
