import Nuclear from 'nuclear-js';
import React from 'react';

import App from './components/App';
import initializeBfModule from './modules/bf';

const reactor = new Nuclear.Reactor({
  debug: true,
});
const bf = initializeBfModule(reactor);
const actions = {
  bf: bf.actions,
};

React.render(<App reactor={reactor} actions={actions}/>, document.body);
