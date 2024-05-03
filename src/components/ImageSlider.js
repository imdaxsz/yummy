import Component from '@components';
import importSwipper from '@libs/swipper';
import ImageCropperModal from './ImageCropper';

import 'swiper/css';
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
    importSwipper().then(({ Swiper, Navigation, Scrollbar }) => {
      new Swiper('.swiper', {
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
        spaceBetween: 4,
        modules: [Navigation, Scrollbar],
      });
    })
  }

  removeAttachments(idx) {
    const { imageUrl: prev, updateAttachments } = this.props;
    const attachments = prev.filter((_, i) => i !== idx);
    updateAttachments(attachments);
  }

  addItems() {
    const { imageUrl, readonly, updateAttachments } = this.props;

    if (imageUrl) {
      const slideWrapper = this.$target.querySelector('.swiper-wrapper');
      if (!slideWrapper) return;

      const createButtons = (parentNode, img, i) => {
        const tools = document.createElement('div');
        tools.id = 'tools';
        tools.className = 'flex gap-8 absolute top-10 right-10';

        const btnStyle = 'bg-black p-4 rounded-full';

        const editBtn = document.createElement('button');
        editBtn.setAttribute('aria-label', '이미지 수정');
        editBtn.type = 'button';
        editBtn.className = btnStyle;
        editBtn.innerHTML = `<i class='ph ph-pencil-simple text-20 text-white block'></i>`;

        editBtn.addEventListener('click', () => {
          new ImageCropperModal({
            src: img.src,
            updateImage: (src) => updateAttachments({ i, src }),
          });
        });

        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('aria-label', '이미지 삭제');
        removeBtn.type = 'button';
        removeBtn.className = btnStyle;
        removeBtn.innerHTML = `<i class='ph ph-x text-20 text-white block'></i>`;
        removeBtn.addEventListener('click', () => this.removeAttachments(i));

        tools.appendChild(editBtn);
        tools.appendChild(removeBtn);
        parentNode.appendChild(tools);
      };

      imageUrl.forEach((url, i) => {
        const el = document.createElement('div');
        el.className = 'swiper-slide';
        const img = document.createElement('img');
        img.id = `image${i + 1}`;
        img.src = url;
        img.alt = `image${i + 1}`;

        if (!readonly) createButtons(el, img, i);
        el.appendChild(img);
        slideWrapper.appendChild(el);
      });
    }
  }
}
