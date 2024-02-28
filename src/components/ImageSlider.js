import Component from '@components';
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default class ImageSlider extends Component {
  constructor($target, props) {
    super($target, props);
    this.init();
    this.addItems();
  }

  template() {
    return `
      <div class="swiper">
        <div class="swiper-wrapper"></div>
        <div class="swiper-scrollbar"></div>
      </div>
    `;
  }

  init() {
    new Swiper('.swiper', {
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      spaceBetween: 4,
      modules: [Navigation, Scrollbar],
    });
  }

  addItems() {
    const { imageUrl } = this.props;

    if (imageUrl) {
      const slideWrapper = this.$target.querySelector('.swiper-wrapper');
      if (!slideWrapper) return;

      imageUrl.forEach((url) => {
        const el = document.createElement('div');
        el.className = 'swiper-slide';
        const img = document.createElement('img');
        img.src = url;
        el.appendChild(img);
        slideWrapper.appendChild(el);
      });
    }
  }
}
