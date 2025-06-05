export default function createEventBus() {
  const listeners = {};
  return {
    $on(event, fn) {
      (listeners[event] || (listeners[event] = [])).push(fn);
    },
    $off(event, fn) {
      if (!listeners[event]) return;
      if (!fn) {
        listeners[event] = [];
      } else {
        listeners[event] = listeners[event].filter((l) => l !== fn);
      }
    },
    $emit(event, ...args) {
      (listeners[event] || []).forEach((fn) => fn(...args));
    },
  };
}
