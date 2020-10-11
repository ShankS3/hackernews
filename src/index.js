import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './Root';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';


render(<Root />,  document.getElementById('root')
);

serviceWorker.register();
