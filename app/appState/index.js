export default function makeAppState() {
  const appStateListeners = [];
  const state = {
    actions: {},
    getters: {},
    loadPlugin({actions, getters, onUpdate}) {
      Object.assign(state.actions, actions);
      Object.assign(state.getters, getters);

      onUpdate(() => {
        appStateListeners.forEach(cb => cb());
      });
    },
    onAppStateUpdate(callback) {
      appStateListeners.push(callback);

      return function unsubscribe() {
        const idx = appStateListeners.indexOf(callback);
        appStateListeners.splice(idx, 1);
      };
    },
  };

  return state;
}
