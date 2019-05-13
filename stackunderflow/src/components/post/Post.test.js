import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from 'react-testing-library'
import PostComment from './PostComment'


it('renders a post', () => {
  const div = document.createElement('div');
  const comp = <PostComment item={posts[0]}></PostComment>;
  const {getByText} = render(comp)

  //ReactDOM.render(comp, div)
  expect(getByText('title test')).toBeInTheDocument();
  
});
