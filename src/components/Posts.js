import React, { useEffect } from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { Card, CardBody, Table, Spinner, CardHeader } from 'reactstrap';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function generateRows(list, name, history) {
  return list.map(story => (
    <tr 
      className={name+" cursor-pointer"} 
      key={story.created_at_i+"_"+story.title}
      onClick={() => history.push( `/${story.objectID}`, { story })}>
      <td>{story.title}</td>
      <td>{story.author}</td>
      <td>{Moment(story.created_at).format('LLL')}</td>
    </tr>
  ))
}

const Posts = ({posts, actions, history}) => {
  useInfiniteScroll(actions, posts.pageNo);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.onFetchNewPosts();
    }, 10000);
    
    return () => clearTimeout(timer);
  });

  const newPosts = posts.stories.newStories.length > 0 && 
                    generateRows(posts.stories.newStories, "new-posts", history);
  const tableRows = posts.stories.allStories.length > 0 && 
                      generateRows(posts.stories.allStories, "posts", history);

  return (
    <Card color="dark">
      <CardHeader tag="h5" className="text-light">All stories</CardHeader>
      <CardBody>
        {
          (tableRows || newPosts) && (
            <Table className="posts-table" hover>
              <tbody>
                {newPosts}
                {tableRows}
              </tbody>
            </Table>
          )} 
          { posts.loading && (
            <div className="d-flex justify-content-center">
              <b className="text-light">Loading... </b>
            </div>
          )}
      </CardBody>
    </Card>
  );
};

Posts.propTypes = {
  posts   : PropTypes.object.isRequired,
  actions : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
}

export default Posts;
