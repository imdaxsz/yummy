import Component from '@components';
import anime from 'animejs';

export default class Snackbar extends Component {
  $portal;

  constructor(props) {
    const portal = document.createElement('div');
    portal.id = 'snackbar';
    portal.className =
      'fixed inset-0 z-[40] flex flex-col justify-end py-20 pointer-events-none';
    document.body.appendChild(portal);
    super(portal, props);
    this.$portal = portal;
  }

  template() {
    const { message } = this.props;
    return `
      <div class="max-w-lg w-[90%] mx-auto bg-zinc-800/80 text-sm text-white rounded-md role="alert">
        <div class="p-16 text-16 text-center">
          ${message}
        </div>
      </div>
    `;
  }

  didMount() {
    // 2초 뒤 제거
    const el = anime({
      targets: '#snackbar',
      opacity: 0,
      duration: 2000,
      autoplay: false,
      easing: 'easeInCubic',
      complete: () => {
        this.$portal.remove();
      },
    });
    el.play();
  }
}
