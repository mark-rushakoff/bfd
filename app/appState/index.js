export default function makeAppState() {
  const state = {
    actions: {},
    getters: {},
    loadPlugin({actions, getters}) {
      Object.assign(state.actions, actions);
      Object.assign(state.getters, getters);
    },
  };

  return state;
}
