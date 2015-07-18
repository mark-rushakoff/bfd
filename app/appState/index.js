import makeNotifier from '../notifier';

export default function makeAppState() {
  const appStateChangedNotifier = makeNotifier();
  const state = {
    actions: {},
    getters: {},
    loadPlugin({actions, getters, onUpdate}) {
      Object.assign(state.actions, actions);
      Object.assign(state.getters, getters);

      onUpdate(() => {
        appStateChangedNotifier.notify();
      });
    },
    onAppStateUpdate: appStateChangedNotifier.observe,
  };

  return state;
}
