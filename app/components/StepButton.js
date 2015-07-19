import React from 'react';

import makeBaseComponent from './baseComponent';

export default makeBaseComponent({
  name: 'StepButton',
  actionNames: ['step'],
  render(props, state, actions) {
    return (
      <button className='step' onClick={() => actions.step()}>
        Step
      </button>
    );
  },
});
