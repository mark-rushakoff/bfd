import stampit from 'stampit';

window.stubAppState = stampit().refs({
  actions: {},
  getters: {},
  onAppStateUpdate() {},
}).methods({
  stubAction(name) {
    this.actions[name] = jasmine.createSpy(name);
  },
  stubGetter(name) {
    const getter = this.getters[name] = jasmine.createSpy(name);
    return getter;
  },
});
