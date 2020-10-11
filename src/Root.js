import React, { Profiler } from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
){}

const store = configureStore();

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Profiler id="hackernews" onRender={onRenderCallback}>
            <App />
          </Profiler>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default Root;
