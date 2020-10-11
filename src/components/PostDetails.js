import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const PostDetails = ({location, history}) => {
  return (
    <>
      <Button color="secondary" onClick={() => history.push("/")}>
        Back
      </Button>
      <div>{JSON.stringify(location.state.story)}</div>
    </>
  );
}

PostDetails.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default PostDetails;
