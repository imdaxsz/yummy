export default class Component {
  $target;

  $props;

  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.$state = {};
    this.setup();
    this.setEvent();
    this.mount();
  }

  // state 초기화
  setup() {}

  template() {
    return '';
  }

  render() {
    const template = this.template();
    if (template) {
      this.$target.innerHTML = template;
    }
  }

  // 컴포넌트가 마운트 되었을 때
  mount() {
    this.render();
    this.didMount();
  }

  update() {
    this.render();
    this.didUpdate();
  }

  didMount() {}

  didUpdate() {}

  setState(newState) {
    const updatedState = { ...this.$state, ...newState };
    if (JSON.stringify(this.$state) === JSON.stringify(updatedState)) {
      return;
    }
    this.state = updatedState;
    this.update();
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
