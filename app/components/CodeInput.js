import React from 'react';

export default React.createClass({
  displayName: 'CodeInput',
  contextTypes: {
    actions: React.PropTypes.shape({
      setRawCode: React.PropTypes.func.isRequired,
    }).isRequired,
    getters: React.PropTypes.shape({
      rawCode: React.PropTypes.func.isRequired,
    }),
  },
  getInitialState() {
    return {
      rawCode: this.context.getters.rawCode(),
    };
  },
  render() {
    const setRawCode = this.context.actions.setRawCode;
    return (
      <textarea
        id='code-input'
        value={this.state.rawCode}
        onChange={e => setRawCode(e.target.value)}
      />
    );
  },
});
