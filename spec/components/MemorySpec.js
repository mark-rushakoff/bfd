import Memory from '../../app/components/Memory';

describe('Memory component', () => {
  let appState;
  let node;

  beforeEach(() => {
    appState = stubAppState();
    appState.stubGetter('memory').and.returnValue([0, 128, 255]);
    appState.stubGetter('memoryPointer').and.returnValue(1);

    node = renderForTest(Memory, {}, appState);
  });

  it('renders the memory values', () => {
    const $cells = $(node).find('.memory .cell');
    expect($cells).toHaveLength(3);
    expect($cells.eq(0)).toHaveText(/0x00/);
    expect($cells.eq(1)).toHaveText(/0x80/);
    expect($cells.eq(2)).toHaveText(/0xFF/);

    expect($cells.eq(1)).toHaveClass('cell--active');
  });
});
