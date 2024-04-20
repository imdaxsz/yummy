import Component from '@components';
import scrollLock from '@utils/scrollLock';

export default class Loader extends Component {
  $container;

  constructor({ color = 'zinc-300 opacity-70', backdrop = false, ...rest }) {
    const container = document.createElement('div');
    container.id = 'loader';
    container.className = 'fixed inset-0 z-30 flex-center';
    if (backdrop) container.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    document.body.appendChild(container);
    super(container, { backdrop, color, ...rest });
    this.$container = container;
  }

  template() {
    const { color } = this.props;
    const loaderColor = `text-${color}`;
    return `
      <div class='loader ${loaderColor}'></div>
    `;
  }

  didMount() {
    scrollLock('block');
  }

  unmount() {
    scrollLock('none');
    this.$container.remove();
  }
}
