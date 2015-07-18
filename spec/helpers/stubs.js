import stampit from 'stampit';

window.stubAppState = stampit().props({
  actions: {},
  getters: {},
}).methods({
  stubAction(name) {
    this.actions[name] = jasmine.createSpy(name);
  },
  stubGetter(name) {
    const getter = this.getters[name] = jasmine.createSpy(name);
    return getter;
  },
});
