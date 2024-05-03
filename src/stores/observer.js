/* eslint-disable no-param-reassign */
let currentObserver = null;

export const setCurrentObserver = (observer) => {
  currentObserver = observer;
};

export const observable = (obj) => {
  const observers = {};

  return new Proxy(obj, {
    get(target, key) {
      observers[key] = observers[key] || {};
      if (currentObserver)
        observers[key][currentObserver.constructor.name] = currentObserver;
      return target[key];
    },
    set(target, key, value) {
      // 이전과 같은 값을 저장하려는 경우 update하지 않는다.
      if (target[key] === value) return true;
      if (JSON.stringify(target[key]) === JSON.stringify(value)) return true;
      target[key] = value;
      // state가 포함된 컴포넌트 리렌더링
      if (typeof observers[key] === 'object') {
        Object.values(observers[key]).forEach((component) => {
          component.render();
        });
      }
      return true; // 성공 표시
    },
  });
};
