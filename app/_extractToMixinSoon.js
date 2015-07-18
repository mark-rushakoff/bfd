import React from 'react';

export function makeStateFromGetters(getters) {
  const state = {};
  Object.keys(getters).forEach(getterName => {
    state[getterName] = getters[getterName]();
  });

  return state;
}

export function makeContextTypes(actionNames, getterNames) {
  const actionShape = {};
  actionNames.forEach(actionName => {
    actionShape[actionName] = React.PropTypes.func.isRequired;
  });
  const getterShape = {};
  getterNames.forEach(getterName => {
    getterShape[getterName] = React.PropTypes.func.isRequired;
  });

  return {
    actions: React.PropTypes.shape(actionShape).isRequired,
    getters: React.PropTypes.shape(getterShape).isRequired,
    onAppStateUpdate: React.PropTypes.func.isRequired,
  };
}
