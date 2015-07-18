import classNames from 'classnames';
import React from 'react';

import makeBaseComponent from './baseComponent';

export default makeBaseComponent({
  name: 'Instructions',
  getterNames: ['instructions'],
  render(props, state) {
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
  },
});
