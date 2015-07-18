import bf from '../../app/bf';
import machine from '../../app/appState/machine';
import makeAppState from '../../app/appState/';

describe('appState.machine', () => {
  let appState;

  beforeEach(() => {
    appState = makeAppState();
    appState.loadPlugin(machine());
  });

  it('exposes default getters', () => {
    expect(appState.getters.rawCode()).toEqual('');
    expect(appState.getters.programCycles()).toEqual(0);
    expect(appState.getters.instructions()).toEqual([]);
  });

  describe('after updating the raw code', () => {
    beforeEach(() => {
      appState.actions.setRawCode('>+.');
    });

    it('is reflected in the getters', () => {
      expect(appState.getters.rawCode()).toEqual('>+.');
      expect(appState.getters.instructions()).toEqual([bf.INC_PTR, bf.INC_MEM, bf.PRINT]);
    });
  });
});
