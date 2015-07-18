import CodeInput from '../../app/components/CodeInput';

describe('code input', () => {
  let appState;
  let node;

  beforeEach(() => {
    appState = stubAppState();
    appState.stubGetter('rawCode').and.returnValue('>>>+.');
    appState.stubAction('setRawCode');
    node = renderForTest(CodeInput, {}, appState);
  });

  describe('with initial app state', () => {
    it('reflects the raw code getter in the input', () => {
      expect($codeInput()).toHaveValue('>>>+.');
    });

    describe('after changing the input', () => {
      beforeEach(() => {
        Simulate.change($codeInput()[0], {target: {value: '<<<-.'}});
      });

      it('calls the setRawCode action', () => {
        expect(appState.actions.setRawCode).toHaveBeenCalledWith('<<<-.');
      });
    });
  });

  function $codeInput() {
    return $(node).find('#code-input');
  }
});
