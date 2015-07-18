import React from 'react';

import AppStateWrapper from './AppStateWrapper';
import CodeInput from './CodeInput';
import Instructions from './Instructions';

export default React.createClass({
  displayName: 'App',
  propTypes: {
    appState: React.PropTypes.object.isRequired,
  },
  render() {
    return (
      <AppStateWrapper appState={this.props.appState}>
        {
          () => <div>
            <CodeInput/>
            <Instructions/>
          </div>
        }
      </AppStateWrapper>
    );
  },
});
