import { setCurrentObserver } from '@stores/observer';

export default class Component {
  $target;

  props;

  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  didMount() {}

  template() {
    return '';
  }

  render() {
    setCurrentObserver(this);
    const template = this.template();
    if (template) {
      this.$target.innerHTML = template;
      this.didMount();
      setCurrentObserver(null);
    }
  }

  setState(newState) {
    const updatedState = { ...this.state, ...newState };
    if (JSON.stringify(this.state) === JSON.stringify(updatedState)) {
      return;
    }
    this.state = updatedState;
    this.render();
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      return callback(event);
    });
  }
}
