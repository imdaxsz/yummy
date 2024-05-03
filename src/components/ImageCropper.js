import Component from '@components';
import importCropper from '@libs/cropper';
import scrollLock from '@utils/scrollLock';
import 'cropperjs/dist/cropper.min.css';

export default class ImageCropperModal extends Component {
  $modal;
  $cropper;
  cropBoxData;
  canvasData;

  constructor({ src, updateImage }) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'fixed inset-0 z-30 flex-center';
    document.body.appendChild(modal);
    super(modal, { src, updateImage });
    this.$modal = modal;
    this.init();
  }

  template() {
    const { src } = this.props;

    return `
      <div class='max-w-screen-sm w-[100%] h-[100%] bg-white'>
        <div class='modal-content'>
          <div class='flex items-center justify-between p-12'>
            <h3 class='font-semibold text-18'>편집하기</h3>
            <button type='button' aria-label='닫기' class='close'>
              <i class='block ph ph-x text-20'></i>
            </button>
          </div>
          <div class='modal-body py-12'>
            <div class='img-container h-[70dvh]'>
              <img id='image' class='w-[100%] h-[100%] object-contain' src=${src} alt='Picture'>
            </div>
          </div>
          <div class='flex-center gap-8 py-24'>
            <button 
              type='button' 
              aria-label='취소' 
              class='close w-110 py-4 bg-zinc-100 rounded'
            >
              취소
            </button>
            <button 
              type='button' 
              aria-label='저장' 
              class='save w-110 py-4 rounded text-white bg-primary'
            >
              저장
            </button>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    const image = this.$target.querySelector('#image');
    importCropper().then((Cropper) => {
      this.$cropper = new Cropper(image, {
        viewMode: 1,
        aspectRatio: 1,
        autoCropArea: 1,
      });
    })
  }

  didMount() {
    scrollLock('block');
  }

  setEvent() {
    this.addEvent('click', '.close', () => {
      this.closeModal();
    });
    this.addEvent('click', '.save', () => {
      this.saveCroppedImage();
    });
  }

  closeModal() {
    this.cropBoxData = this.$cropper.getCropBoxData();
    this.canvasData = this.$cropper.getCanvasData();
    this.$cropper.destroy();
    scrollLock('none');
    this.$modal.remove();
  }

  saveCroppedImage() {
    const { updateImage } = this.props;
    const canvas = this.$cropper.getCroppedCanvas();
    updateImage(canvas.toDataURL('image/webp'));
    this.closeModal();
  }
}
