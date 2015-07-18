export default function makeNotifier() {
  const observers = [];

  return {
    notify() {
      observers.forEach(o => {
        o();
      });
    },
    observe(callback) {
      observers.push(callback);

      return () => {
        const idx = observers.indexOf(callback);
        observers.splice(idx, 1);
      };
    },
  };
}
