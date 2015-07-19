import bf from '../../app/bf';
import Instructions from '../../app/components/Instructions';

describe('Instructions component', () => {
  let appState;
  let node;

  beforeEach(() => {
    appState = stubAppState();
    appState.stubGetter('instructions').and.returnValue([bf.INC_MEM, bf.DEC_MEM]);
    appState.stubGetter('instructionPointer').and.returnValue(1);

    node = renderForTest(Instructions, {}, appState);
  });

  it('renders the instructions', () => {
    const $instructions = $(node).find('.instruction');
    expect($instructions).toHaveLength(2);
    expect($instructions.eq(0)).toHaveClass('inc-mem');
    expect($instructions.eq(1)).toHaveClass('dec-mem instruction--active');
  });
});
