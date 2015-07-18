import Store from 'immutable-store';

import bf from '../bf';
import makeNotifier from '../notifier';

export default function machine() {
  let store = Store({
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
    instructionPointer: 0,
    memory: [0],
    memoryPointer: 0,
    outputBytes: [],
    outputString: '',
    programCycles: 0,
    programFinished() {
      return {
        value: false,
        deps: {
          instructions: ['instructions'],
          instructionPointer: ['instructionPointer'],
        },
        get(value, deps) {
          return deps.instructionPointer >= deps.instructions.length;
        },
      };
    },
    rawCode: '',
  });

  const storeChangedNotifier = makeNotifier();
  const notifyStoreChanged = storeChangedNotifier.notify;
  return {
    actions: {
      setRawCode(code) {
        store = store.set('rawCode', code);
        notifyStoreChanged();
      },
      step() {
        if (store.programFinished) {
          return;
        }

        const instruction = store.instructions[store.instructionPointer];
        switch (instruction) {
          case bf.INC_PTR:
            store = store.set('instructionPointer', store.instructionPointer + 1);
            store = store.set('programCycles', store.programCycles + 1);
            store = store.set('memoryPointer', store.memoryPointer + 1);
            if (store.memoryPointer >= store.memory.length) {
              store = store.memory.push(0);
            }
            break;
          case bf.INC_MEM:
            store = store.set('instructionPointer', store.instructionPointer + 1);
            store = store.set('programCycles', store.programCycles + 1);
            const memPointer = store.memoryPointer;
            const newMemValue = (store.memory[memPointer] + 1) & 255;
            store = store.memory.splice(memPointer, 1, newMemValue);
            break;
          case bf.PRINT:
            store = store.set('instructionPointer', store.instructionPointer + 1);
            store = store.set('programCycles', store.programCycles + 1);
            const currentValue = store.memory[store.memoryPointer];
            store = store.outputBytes.push(currentValue);
            store = store.set('outputString', store.outputString + String.fromCharCode(currentValue));
            break;
          default:
            console.warn('stepped on instruction that is not yet implemented:', instruction); // eslint-disable-line no-console
        }
        notifyStoreChanged();
      },
    },
    getters: exposeGetters([
      'instructions',
      'instructionPointer',
      'memory',
      'memoryPointer',
      'outputBytes',
      'outputString',
      'programCycles',
      'programFinished',
      'rawCode',
    ]),
    onUpdate: storeChangedNotifier.observe,
  };

  function exposeGetters(getterNames) {
    const getters = {};
    getterNames.forEach(getterName => {
      getters[getterName] = function() {
        return store[getterName];
      };
    });

    return getters;
  }
}
