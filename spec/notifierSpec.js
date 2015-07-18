import makeNotifier from '../app/notifier';

describe('notifier', () => {
  let notifier;
  let cb1, cb2;
  beforeEach(() => {
    cb1 = jasmine.createSpy('cb1');
    cb2 = jasmine.createSpy('cb2');
    notifier = makeNotifier();
  });

  it('provides a standalone functions for observing and notifying, and both are called synchronously', () => {
    const observe = notifier.observe;
    const unsub1 = observe(cb1);
    const unsub2 = observe(cb2);

    const notify = notifier.notify;
    notify();
    expect(cb1.calls.count()).toBe(1);
    expect(cb2.calls.count()).toBe(1);

    unsub1();
    notify();
    expect(cb1.calls.count()).toBe(1);
    expect(cb2.calls.count()).toBe(2);

    unsub2();
    notify();
    expect(cb1.calls.count()).toBe(1);
    expect(cb2.calls.count()).toBe(2);

    const noArgs = [];
    expect(cb1.calls.allArgs()).toEqual([noArgs]);
    expect(cb2.calls.allArgs()).toEqual([noArgs, noArgs]);
  });
});
