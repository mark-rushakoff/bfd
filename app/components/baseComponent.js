import React from 'react';

export default function makeBaseComponent({
  name,
  actionNames,
  getterNames,
  render,
}) {
  return React.createClass({
    displayName: name,
    contextTypes: makeContextTypes(actionNames || [], getterNames || []),
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
      return render(this.props, this.state, this.context.actions);
    },
  });
}

function makeStateFromGetters(getters) {
  const state = {};
  Object.keys(getters).forEach(getterName => {
    state[getterName] = getters[getterName]();
  });

  return state;
}

function makeContextTypes(actionNames, getterNames) {
  const requiredFunc = React.PropTypes.func.isRequired;
  const actionShape = {};
  actionNames.forEach(actionName => {
    actionShape[actionName] = requiredFunc;
  });
  const getterShape = {};
  getterNames.forEach(getterName => {
    getterShape[getterName] = requiredFunc;
  });

  return {
    actions: shape(actionShape),
    getters: shape(getterShape),
    onAppStateUpdate: requiredFunc,
  };

  function shape(def) {
    return React.PropTypes.shape(def).isRequired;
  }
}
