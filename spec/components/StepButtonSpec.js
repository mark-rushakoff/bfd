import StepButton from '../../app/components/StepButton';

describe('Step button component', () => {
  let appState;
  let node;

  beforeEach(() => {
    appState = stubAppState();
    appState.stubAction('step');

    node = renderForTest(StepButton, {}, appState);
  });

  it('is a button', () => {
    expect($button()).toHaveClass('step');
  });

  describe('clicking the button', () => {
    beforeEach(() => {
      Simulate.click($button()[0]);
    });

    it('triggers the step action', () => {
      expect(appState.actions.step).toHaveBeenCalled();
    });
  });

  function $button() {
    return $(node).find('button');
  }
});
