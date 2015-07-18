import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import App from '../app/components/App';
import machine from '../app/appState/machine';
import makeAppState from '../app/appState';

describe('the entire app', () => {
  let appState;
  let appNode;
  beforeEach(() => {
    appState = makeAppState();
    appState.loadPlugin(machine());
    const app = React.createElement(App, {appState});
    appNode = TestUtils.renderIntoDocument(app).getDOMNode();
  });

  it('renders the right controls', () => {
    expect($codeInput()).toExist();
  });

  xdescribe('changing the code input', () => {
    beforeEach(() => {
      Simulate.change($codeInput()[0], {target: {value: '>+.'}});
    });

    it('renders instruction nodes into the instructions div', () => {
      const $instruction = $instructions().find('.instruction');
      expect($instruction.eq(0)).toHaveClass('inc-pointer');
      expect($instruction.eq(1)).toHaveClass('inc-mem');
      expect($instruction.eq(2)).toHaveClass('print');
    });
  });

  function $codeInput() {
    return $(appNode).find('#code-input');
  }

  function $instructions() {
    return $(appNode).find('.instructions');
  }
});
