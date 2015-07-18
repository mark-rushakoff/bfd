import bf from '../../app/bf';
import machine from '../../app/appState/machine';
import makeAppState from '../../app/appState/';

describe('appState.machine', () => {
  let actions, getters;

  beforeEach(() => {
    const appState = makeAppState();
    appState.loadPlugin(machine());

    actions = appState.actions;
    getters = appState.getters;
  });

  it('exposes default getters', () => {
    expect(getters.rawCode()).toEqual('');
    expect(getters.programCycles()).toEqual(0);
    expect(getters.instructions()).toEqual([]);
    expect(getters.memory()).toEqual([0]);
    expect(getters.memoryPointer()).toEqual(0);
  });

  describe('after updating the raw code', () => {
    beforeEach(() => {
      actions.setRawCode('>ignored+.');
    });

    it('is reflected in the getters', () => {
      expect(getters.rawCode()).toEqual('>ignored+.');
      expect(getters.instructions()).toEqual([bf.INC_PTR, bf.INC_MEM, bf.PRINT]);
    });

    describe('stepping once (INC_PTR)', () => {
      beforeEach(() => {
        actions.step();
      });

      it('increments the pointer and opens another memory slot', () => {
        expect(getters.programCycles()).toEqual(1);
        expect(getters.memory()).toEqual([0, 0]);
        expect(getters.memoryPointer()).toEqual(1);
        expect(getters.instructionPointer()).toEqual(1);
      });

      describe('stepping again (INC_MEM)', () => {
        beforeEach(() => {
          actions.step();
        });

        it('increments the memory', () => {
          expect(getters.programCycles()).toEqual(2);
          expect(getters.memory()).toEqual([0, 1]);
          expect(getters.memoryPointer()).toEqual(1);
          expect(getters.instructionPointer()).toEqual(2);
        });

        describe('stepping again (PRINT)', () => {
          beforeEach(() => {
            expect(getters.outputBytes()).toEqual([]);
            expect(getters.outputString()).toEqual('');
            expect(getters.programFinished()).toBe(false);
            actions.step();
          });

          it('adjusts the output', () => {
            expect(getters.programCycles()).toEqual(3);
            expect(getters.instructionPointer()).toEqual(3);

            expect(getters.outputBytes()).toEqual([1]);
            expect(getters.outputString()).toEqual('\x01');
            expect(getters.programFinished()).toBe(true);
          });

          describe('attempting to step past the end of the program', () => {
            beforeEach(() => {
              actions.step();
            });

            it('does not change the state', () => {
              expect(getters.programCycles()).toEqual(3);
              expect(getters.instructionPointer()).toEqual(3);

              expect(getters.outputBytes()).toEqual([1]);
              expect(getters.outputString()).toEqual('\x01');
              expect(getters.programFinished()).toBe(true);
            });
          });
        });
      });
    });
  });
});
