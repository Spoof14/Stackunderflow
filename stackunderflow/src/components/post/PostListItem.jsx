import React, { PureComponent } from 'react'
import List from '../utility/List';
import TagListItem from './TagListItem';

export default class PostListItem extends PureComponent {
    render() {
        let { votes, answers, views, title, tags, user } = this.props.item
        return (
            <div className="post-list-item">

                <div className="post-list-item-box">
                    <span>{votes}</span>
                    <span>votes</span>
                </div>
                <div className="post-list-item-box">
                    <span>{answers}</span>
                    <span>answers</span>
                </div>
                <div className="post-list-item-box">
                    <span>{views}</span>
                    <span>views</span>
                </div>

                <div className="post-list-item-box">
                    <div className="post-list-item-title">
                        {title}
                    </div>
                    <div className="post-list-item-sub">
                        <div className="post-list-item-tags">
                            <List Component={TagListItem} items={tags} listName="tag-list"></List>
                        </div>
                        <div className="post-list-item-author">
                            {user}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
