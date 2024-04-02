import Component from '@components';
import MoreModal from '@components/MoreModal';
import { FOOD_CATEGORY } from '@constants';
import getFormattedDate from '@utils/getFormattedDate';

export default class PostHeader extends Component {
  template() {
    const { name, categories, username, createdAt, isMine } = this.props;
    const categoriesLabel = categories.map(
      (item) => FOOD_CATEGORY.find((i) => i.id === item).text,
    );

    return `
      <div>
        <div class='flex gap-12 items-end'>
          <h3 class='text-20'>${name}</h3>
          <p class='text-14 pb-3 text-secondary font-semibold'>${categoriesLabel.join(', ')}</p>
        </div>
        <div id='info' class='flex-center gap-6 text-14'>
          <p class='text-gray-500'>${username.split('@')[0]}</p>
          <span class='text-zinc-300 dot'>${getFormattedDate(createdAt)}</span>
        </div>
      </div>
      ${
        isMine
          ? `<button id='more' aria-label='더보기' class='text-24 text-zinc-400 -mx-7'>
              <i class="block ph-bold ph-dots-three-vertical"></i>
            </button>
            `
          : ``
      }
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#more', this.toggleMoreModal.bind(this));
  }

  toggleMoreModal() {
    const { id,  hasImage } = this.props;
    const $modal = document.querySelector('#modal');
    if (!$modal) {
      new MoreModal({
        toggleMoreModal: this.toggleMoreModal.bind(this),
        docId: id,
        hasImage,
      });
      return;
    }
    $modal.remove();
  }
}
