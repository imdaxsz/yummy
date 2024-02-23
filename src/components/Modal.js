import Component from '@components';

export default class Modal extends Component {
  $modal;

  constructor(props) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'fixed inset-0 z-30';
    document.body.appendChild(modal);
    super(modal, props);
    this.$modal = modal;
  }

  template() {
    const { type, message } = this.props;
    const buttonStyle = () => {
      const common = 'w-110 py-4 rounded text-white';
      if (type === 'alert') return `bg-primary ${common}`;
      return `bg-secondary ${common}`;
    };

    return `
      <div id='backdrop' class='w-full h-full bg-black/30 flex-center'></div>
      <div
        id='modal-container'
        class='bg-white p-16 absolute z-31 item-center rounded-xl'
      >
        <div class='text-20 flex justify-end'>
          <button id='close' class='block'>
            <i class='ph ph-x block'></i>
          </button>
        </div>
        <div class='py-16 text-center'>
          ${message}
        </div>
        <div class='flex-center gap-12 pt-8 px-8 font-medium'>
          ${
            type === 'confirm'
              ? `<button id='cancel' class='w-110 py-4 bg-zinc-100 rounded '>
                  취소
                </button>`
              : ``
          }
          <button id='ok' class='${buttonStyle()}'>확인</button>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('mousedown', '#backdrop, #close', () => {
      this.$modal.remove();
    });
    this.addEvent('click', '#ok', () => {
      const { onClose } = this.props;
      if (onClose) onClose();
      this.$modal.remove();
    });
    if (this.props.type === 'confirm') {
      this.addEvent('click', '#cancel', () => {
        this.$modal.remove();
      });
    }
  }
}
