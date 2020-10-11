import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import PostsContainer from './containers/PostsContainer';
import PostDetailsContainer from './containers/PostDetailsContainer';

const App = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <Switch>
          <Route exact path="/" component={PostsContainer} />
          <Route exact path="/:id" component={PostDetailsContainer} />
        </Switch>
      </div>
    </>
  );
}

export default App;
