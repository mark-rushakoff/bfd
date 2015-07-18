import React from 'react';

export default React.createClass({
  displayName: 'AppStateWrapper',
  propTypes: {
    appState: React.PropTypes.object.isRequired,
    children: React.PropTypes.func.isRequired,
  },
  childContextTypes: {
    actions: React.PropTypes.object.isRequired,
    getters: React.PropTypes.object.isRequired,
    onAppStateUpdate: React.PropTypes.func.isRequired,
  },
  getChildContext() {
    const appState = this.props.appState;
    return {
      actions: appState.actions,
      getters: appState.getters,
      onAppStateUpdate: appState.onAppStateUpdate,
    };
  },
  render() {
    return (
      <div>
        {this.props.children()}
      </div>
    );
  },
});
