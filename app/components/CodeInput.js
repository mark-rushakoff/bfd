import React from 'react';

import makeBaseComponent from './baseComponent';

export default makeBaseComponent({
  name: 'CodeInput',
  actionNames: ['setRawCode'],
  getterNames: ['rawCode'],
  render(props, state, actions) {
    return (
      <textarea
        id='code-input'
        value={state.rawCode}
        onChange={e => actions.setRawCode(e.target.value)}
      />
    );
  },
});
