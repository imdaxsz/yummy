import { updateList } from '@apis/list';
import Component from '@components';
import Modal from '@components/Modal';
import store from '@stores';
import sharePage from '@utils/share';

export default class MyListHeader extends Component {
  $input;

  setup() {
    const { title } = this.props;
    this.state = { title, edit: false };
  }

  template() {
    const { title: listTitle, likes, count } = this.props;
    const { edit, title } = this.state;
    return `
      <div class='flex items-center gap-16 pt-28 pb-12 tracking-tight'>
        ${
          edit
            ? `<input id='title' value='${title}' type='text' class='w-[60%] rounded-none border-b-1 px-4 py-2 border-zinc-300 text-zinc-500'/><button id='save' class='btn-primary px-12 py-2 bg-primary rounded-full text-white font-medium text-14'>저장</button>`
            : `<h1 class='w-fit font-medium leading-none text-18'>
          ${listTitle}
        </h1><button id='edit'><i class="block ph ph-pencil-simple-line pt-3 text-zinc-400"></i></button>`
        }
      </div>
      <div id='action' class='flex justify-between items-center text-zinc-500'>
        <div class='flex-center gap-24'>
          <div id='like' aria-label='좋아요' class='flex-center gap-2'>
            <i class='block ph ph-heart text-20'></i>
            <span class='text-14'>${likes.length}</span>
          </div>
          <button id='share' aria-label='공유하기'>
            <i class='block ph ph-share-network text-20'></i>
          </button>
        </div>
        <button id='deleteAll' aria-label='전체삭제' class='text-13'>전체삭제</button>
      </div>
    <p class='text-zinc-400 text-end pt-24 text-13'>
      ${count}곳의 맛집이 있어요!
    </p>
    `;
  }

  didMount() {
    this.$input = this.$target.querySelector('#title');
  }

  setEvent() {
    this.addEvent('click', '#edit', () => {
      this.setState({ ...this.state, edit: true });
      const value = this.$input.value;
      this.$input.focus();
      // cursor 위치를 마지막으로 하게 하기 위함
      this.$input.value = '';
      this.$input.value = value;
    });

    this.addEvent('click', '#save', async () => {
      if (!store.state.user) return;
      await updateList(store.state.user.uid, { title: this.$input.value });
      this.setState({ ...this.state, edit: false });
    });

    this.addEvent('click', '#share', sharePage);

    const { count, onClickDelete } = this.props;
    this.addEvent('click', '#deleteAll', async () => {
      if (count === 0) {
        new Modal({ type: 'alert', message: '삭제할 맛집이 없어요.' });
        return;
      }
      new Modal({
        type: 'confirm',
        message: '모든 나의 맛집을 삭제할까요?',
        onClose: onClickDelete,
      });
    });
  }
}
