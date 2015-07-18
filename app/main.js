import React from 'react';

import App from './components/App';
import makeAppState from './appState';
import machine from './appState/machine';

const appState = makeAppState();
appState.loadPlugin(machine());

React.render(<App appState={appState}/>, document.body);
