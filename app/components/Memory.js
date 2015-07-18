import classNames from 'classnames';
import React from 'react';

import makeBaseComponent from './baseComponent';

import '../../style/component/memory.scss';

export default makeBaseComponent({
  name: 'Memory',
  getterNames: ['memory', 'memoryPointer'],
  render(props, state) {
    return (
      <div className='memory'>
        {
          state.memory.map((value, index) => {
            const className = classNames('cell', {'cell--active': state.memoryPointer === index});
            return (
              <div key={index} className={className}>
                {
                  // Apparently 0-filling a string in JS is a hard problem...
                  // Just handle the one special case.
                }
                <span className='cell--value'>
                  {`0x${value < 10 ? '0' : ''}${value.toString(16).toUpperCase()}`}
                </span>
              </div>
            );
          })
        }
      </div>
    );
  },
});
