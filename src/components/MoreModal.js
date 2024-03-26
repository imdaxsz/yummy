import Component from '@components';
import Modal from './Modal';

export default class MoreModal extends Component {
  constructor() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className =
      'w-full m-auto max-w-screen-sm fixed inset-0 z-10';
    document.body.appendChild(modal);
    super(modal, {});
    this.$modal = modal;
  }
  template() {
    return `
    <div id='backdrop' class='fixed inset-0 m-auto w-full h-content'></div>
      <div
        class='absolute top-100 right-24 z-30 flex flex-col
          bg-white shadow-sm border border-zinc-200 rounded-md font-medium'
        >
        <button id='edit' class='px-12 py-8 flex-center gap-6 text-zinc-500'>
          <i class="block ph ph-pencil-simple text-24 pt-2"></i>
          <span>수정하기</span>
        </button>
        <hr/>
        <button id='delete' class='px-12 py-8 flex-center gap-6 text-red-500'>
          <i class="block ph ph-trash text-24 pt-2"></i>
          <span>삭제하기</span>
        </button>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#backdrop', () => this.$modal.remove());
    this.addEvent('click', '#delete', () => {
      new Modal({
        type: 'confirm',
        message: `삭제된 글은 복구할 수 없어요.<br/>글을 삭제할까요?`,
        onClose: () => console.log('삭제완료'),
      });
      this.$modal.remove();
    });
  }
}
