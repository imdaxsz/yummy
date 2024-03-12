import Component from '@components';
import scrollLock from '@utils/scrollLock';

export default class Modal extends Component {
  $modal;

  constructor({ type = '', backdrop = true, ...rest }) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'fixed inset-0 z-30';
    document.body.appendChild(modal);
    super(modal, { type, backdrop, ...rest });
    this.$modal = modal;
  }

  template() {
    const { type, backdrop, message } = this.props;
    const buttonStyle = () => {
      const common = 'w-110 py-4 rounded text-white';
      if (type === 'alert') return `bg-primary ${common}`;
      return `bg-secondary ${common}`;
    };

    return `
      ${backdrop ? `<div id='backdrop' class='w-full h-full bg-black/30 flex-center'></div>` : ``}
      <div
        id='modal-container'
        class='bg-white p-16 absolute z-31 item-center rounded-xl'
      >
        <div class='text-20 flex justify-end'>
          <button id='close' aria-label='닫기' class='block'>
            <i class='ph ph-x block'></i>
          </button>
        </div>
        <div class='py-16 text-center'>
          ${message}
        </div>
        <div class='flex-center gap-12 pt-8 px-8 font-medium'>
          ${
            type === 'confirm'
              ? `<button id='cancel' aria-label='취소' class='w-110 py-4 bg-zinc-100 rounded '>
                  취소
                </button>`
              : ``
          }
          <button id='ok' aria-label='확인' class='${buttonStyle()}'>확인</button>
        </div>
      </div>
    `;
  }

  didMount() {
    scrollLock('block');
  }

  setEvent() {
    this.addEvent('mousedown', '#backdrop, #close', this.closeModal.bind(this));
    this.addEvent('click', '#ok', () => {
      const { onClose } = this.props;
      if (onClose) onClose();
      this.closeModal();
    });
    if (this.props.type === 'confirm') {
      this.addEvent('click', '#cancel', this.closeModal.bind(this));
    }
  }

  closeModal() {
    scrollLock('none');
    this.$modal.remove();
  }
}
