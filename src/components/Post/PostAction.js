import Component from '@components';
import sharePage from '@utils/share';

export default class PostAction extends Component {
  template() {
    const { likes } = this.props;

    return `
      <button aria-label='좋아요' class='flex-center gap-4 p-10 border rounded-lg'>
        <i class='block ph-fill ph-heart text-secondary'></i>
        <span class='text-14'>${likes.length}</span>
      </button>
      <button id='share' aria-label='공유하기' class='p-10 border rounded-lg'>
        <i class="block ph ph-share-network"></i>
      </button>
    `;
  }

  setEvent() {
    this.addEvent('click', '#share', sharePage);
  }
}
