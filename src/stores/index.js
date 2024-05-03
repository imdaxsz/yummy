import { observable } from './observer';

const store = {
  state: observable({ user: null, isLoggedIn: false }),

  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(this.state, key))
        this.state[key] = value;
    });
  },
};

export default store;
