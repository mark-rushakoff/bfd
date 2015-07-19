import classNames from 'classnames';
import React from 'react';

import makeBaseComponent from './baseComponent';

import '../../style/component/instructions.scss';

export default makeBaseComponent({
  name: 'Instructions',
  getterNames: ['instructions', 'instructionPointer'],
  render(props, state) {
    return (
      <div className='instructions'>
        {
          state.instructions.map((instruction, index) => {
            const classes = classNames(
              'instruction',
              instruction.toLowerCase().replace('_', '-'),
              {'instruction--active': index === state.instructionPointer}
            );
            return <div key={index} className={classes}/>;
          })
        }
      </div>
    );
  },
});
