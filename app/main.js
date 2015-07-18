import React from 'react';

import App from './components/App';
import makeAppState from './appState';
import machine from './appState/machine';

import '../style/vendor/normalize.css';
import '../style/base/_reset.scss';

const appState = makeAppState();
appState.loadPlugin(machine());

React.render(<App appState={appState}/>, document.body);
