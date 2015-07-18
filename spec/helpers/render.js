import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import AppStateWrapper from '../../app/components/AppStateWrapper';

window.renderForTest = function renderWithContext(component, props, appState) {
  const wrapper = (
    <AppStateWrapper appState={appState}>
      {() => React.createElement(component, props)}
    </AppStateWrapper>
  );
  return TestUtils.renderIntoDocument(wrapper).getDOMNode();
};
