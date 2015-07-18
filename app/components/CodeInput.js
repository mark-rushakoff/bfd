import React from 'react';

import {makeStateFromGetters, makeContextTypes} from '../_extractToMixinSoon';

// This is the API I *want* to write...
function renderCodeInput(state, actions) {
  return (
    <textarea
      id='code-input'
      value={state.rawCode}
      onChange={e => actions.setRawCode(e.target.value)}
    />
  );
}

// And here comes the implementation details for that API:
export default React.createClass({
  displayName: 'CodeInput',
  contextTypes: makeContextTypes(
    ['setRawCode'],
    ['rawCode']
  ),
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
    return renderCodeInput(this.state, this.context.actions);
  },
});
