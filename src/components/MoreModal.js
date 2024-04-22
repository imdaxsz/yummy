import Component from '@components';
import { deletePost } from '@apis/post';
import Modal from './Modal';

export default class MoreModal extends Component {
  constructor(props) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'w-full m-auto max-w-screen-sm fixed inset-0 z-10';
    document.body.appendChild(modal);
    super(modal, props);
    this.$modal = modal;
  }
  template() {
    const { docId } = this.props;
    const editHref = `/write?mode=edit&id=${docId}`;
    return `
      <div id='backdrop' class='fixed inset-0 m-auto w-full h-content'></div>
      <div
        class='absolute top-100 right-24 z-30 flex flex-col
          bg-white shadow-sm border border-zinc-200 rounded-md font-medium'
        >
        <a id='edit' href=${editHref} class='px-12 py-8 flex-center gap-6 text-zinc-500'>
          <i class="block ph ph-pencil-simple text-24 pt-2"></i>
          <span>수정하기</span>
        </a>
        <hr/>
        <button id='delete' aria-label='삭제하기' class='px-12 py-8 flex-center gap-6 text-red-500'>
          <i class="block ph ph-trash text-24 pt-2"></i>
          <span>삭제하기</span>
        </button>
      </div>
    `;
  }

  setEvent() {
    const { docId, hasImage } = this.props;
    this.addEvent('click', '#backdrop', () => this.$modal.remove());
    this.addEvent('click', '#delete', () => {
      new Modal({
        type: 'confirm',
        message: `삭제된 글은 복구할 수 없어요.<br/>글을 삭제할까요?`,
        onClose: () => deletePost(docId, hasImage),
      });
      this.$modal.remove();
    });
  }
}
