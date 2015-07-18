import classNames from 'classnames';
import React from 'react';

import {makeStateFromGetters, makeContextTypes} from '../_extractToMixinSoon';

// This is the API I *want* to write...
function renderInstructions(state) {
  return (
    <div className='instructions'>
      {
        state.instructions.map((instruction, index) => {
          const classes = classNames('instruction', instruction.toLowerCase().replace('_', '-'));
          return <div key={index} className={classes}/>;
        })
      }
    </div>
  );
}

export default React.createClass({
  displayName: 'Instructions',
  contextTypes: makeContextTypes([], ['instructions']),
  getInitialState() {
    return makeStateFromGetters(this.context.getters);
  },
  componentDidMount() {
    const self = this;
    const {onAppStateUpdate, getters} = self.context;
    this.unsub = onAppStateUpdate(() => {
      self.setState(makeStateFromGetters(getters));
    });
  },
  componentWillUnmount() {
    this.unsub();
  },
  /* custom componentShouldUpdate would go here */
  render() {
    return renderInstructions(this.state, this.context.actions);
  },
});
