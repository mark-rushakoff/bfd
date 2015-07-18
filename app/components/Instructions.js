import classNames from 'classnames';
import React from 'react';

export default React.createClass({
  displayName: 'Instructions',
  contextTypes: {
    getters: React.PropTypes.shape({
      instructions: React.PropTypes.func.isRequired,
    }),
  },
  getInitialState() {
    return {
      instructions: this.context.getters.instructions(),
    };
  },
  render() {
    const state = this.state;
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
