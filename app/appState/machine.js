import Store from 'immutable-store';

import bf from '../bf';

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
          const stripped = deps.rawCode.replace(/[^-+><\.]/, '');
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

  const updateCallbacks = [];
  return {
    actions: {
      setRawCode(code) {
        store = store.set('rawCode', code);
        updateCallbacks.forEach(cb => cb());
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
    onUpdate(callback) {
      updateCallbacks.push(callback);

      return function unsubscribe() {
        const idx = updateCallbacks.indexOf(callback);
        updateCallbacks.splice(idx, 1);
      };
    },
  };
}
