import Component from '@components';
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default class ImageSlider extends Component {
  constructor($target, { readonly = false, ...props }) {
    super($target, { readonly, ...props });
    this.init();
    this.addItems();
  }

  template() {
    return `
      <div class='swiper'>
        <div class='swiper-wrapper'></div>
        <div class='swiper-scrollbar'></div>
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

  removeAttachments(idx) {
    const { imageUrl: prev, updateAttachments } = this.props;
    const attachments = prev.filter((_, i) => i !== idx);
    updateAttachments(attachments);
  }

  addItems() {
    const { imageUrl, readonly } = this.props;

    if (imageUrl) {
      const slideWrapper = this.$target.querySelector('.swiper-wrapper');
      if (!slideWrapper) return;

      imageUrl.forEach((url, i) => {
        const el = document.createElement('div');
        el.className = 'swiper-slide';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `image${i + 1}`;
        if (!readonly) {
          const btn = document.createElement('button');
          btn.setAttribute('aria-label', '이미지 삭제');
          btn.id = 'remove';
          btn.type = 'button';
          btn.className = 'bg-black absolute top-10 right-10 p-4 rounded-full';
          btn.innerHTML = `<i class='ph ph-x text-20 text-white block'></i>`;
          btn.addEventListener('click', () => this.removeAttachments(i));
          el.appendChild(btn);
        }
        el.appendChild(img);
        slideWrapper.appendChild(el);
      });
    }
  }
}
