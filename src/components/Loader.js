import Component from '@components';

export default class Loader extends Component {
  constructor({ color = 'primary', backdrop = false, ...rest }) {
    const container = document.createElement('div');
    container.id = 'loader';
    container.className = 'fixed inset-0 z-30 flex-center';
    if (backdrop) container.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    document.body.appendChild(container);
    super(container, { backdrop, color, ...rest });
  }

  template() {
    const { color } = this.props;
    const loaderColor = `text-${color}`;
    return `
      <div class='loader ${loaderColor}'></div>
    `;
  }
}
