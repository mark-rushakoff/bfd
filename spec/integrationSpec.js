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

  describe('changing the code input', () => {
    beforeEach(() => {
      Simulate.change($codeInput()[0], {target: {value: '>+.'}});
    });

    it('renders instruction nodes into the instructions div and shows the initial memory', () => {
      const $instruction = $instructions().find('.instruction');
      expect($instruction.eq(0)).toHaveClass('inc-ptr');
      expect($instruction.eq(1)).toHaveClass('inc-mem');
      expect($instruction.eq(2)).toHaveClass('print');

      expect($cell()).toHaveLength(1);
      expect($cell().eq(0)).toHaveClass('cell--active');
      expect($cell().eq(0)).toHaveText(/0x00/);
    });

    describe('stepping', () => {
      beforeEach(() => {
        for (let i = 0; i < 3; i++) {
          Simulate.click($stepButton()[0]);
        }
      });

      it('updates the memory', () => {
        expect($cell().eq(1)).toHaveClass('cell--active');
        expect($cell().eq(1)).toHaveText(/0x01/);
      });
    });
  });

  function $codeInput() {
    return $(appNode).find('#code-input');
  }

  function $instructions() {
    return $(appNode).find('.instructions');
  }

  function $memory() {
    return $(appNode).find('.memory');
  }

  function $cell() {
    return $memory().find('.cell');
  }

  function $stepButton() {
    return $(appNode).find('button.step');
  }
});
