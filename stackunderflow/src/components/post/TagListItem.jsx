import React, { PureComponent } from 'react'

export default class TagListItem extends PureComponent {
    render() {
        return (
            <a href={this.props.item} className="tag-list-item">
                {this.props.item}
            </a>
        )
    }
}
