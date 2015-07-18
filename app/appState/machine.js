import Store from 'immutable-store';

import bf from '../bf';
import makeNotifier from '../notifier';

export default function machine() {
  let store = Store({
    rawCode: '',
    programCycles: 0,
    instructions() {
      return {
        value: [],
        deps: {
          rawCode: ['rawCode'],
        },
        get(value, deps) {
          const stripped = deps.rawCode.replace(/[^-+><\.]/g, '');
          const charToInstruction = {
            '-': bf.DEC_MEM,
            '+': bf.INC_MEM,
            '>': bf.INC_PTR,
            '<': bf.DEC_PTR,
            '.': bf.PRINT,
          };

          return stripped.split('').map(c => charToInstruction[c]);
        },
      };
    },
  });

  const storeChangedNotifier = makeNotifier();
  return {
    actions: {
      setRawCode(code) {
        store = store.set('rawCode', code);
        storeChangedNotifier.notify();
      },
    },
    getters: {
      rawCode() {
        return store.rawCode;
      },
      programCycles() {
        return store.programCycles;
      },
      instructions() {
        return store.instructions;
      },
    },
    onUpdate: storeChangedNotifier.observe,
  };
}
