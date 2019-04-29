import React, { PureComponent } from 'react'
import List from '../utility/List';
import TagListItem from './TagListItem';


export default class PostComment extends PureComponent {
    render() {
        let { title, _id, votes } = this.props.item;
        let { onClick } = this.props;
        let content = this.props.item.question ? this.props.item.question : this.props.item.comment
        return (

            <div className={this.props.item.isAnswer ? 'is-answer' : ''} style={{ display: 'flex', flexDirection: 'column', background: '#FEFEFE', maxWidth:'50%', margin: '5% auto', padding: '1rem', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</div>

                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button onClick={() => onClick(_id, 1)}>up</button>
                        <h3>{votes}</h3>
                        <button onClick={() => onClick(_id, -1)}>down</button>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                        {content}
                    </div>
                </div>
                {
                    this.props.item.tags &&
					<div style={{display:'flex', flexDirection:'row', }}>
						<List Component={TagListItem} items={this.props.item.tags}></List>
					</div>
                }

            </div>
        )
    }
}
