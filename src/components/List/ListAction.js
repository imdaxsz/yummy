import Component from '@components';
import Snackbar from '@components/Snackbar';
import store from '@stores';
import { toggleLikeList } from '@utils/list';
import sharePage from '@utils/share';

export default class ListAction extends Component {
  template() {
    const { email, likes, isLiked, isMine } = this.props;
    const likeIcon = {
      type: isLiked ? 'ph-fill' : 'ph',
      color: isLiked ? 'text-secondary' : 'text-zinc-500',
    };

    return `
      <span class='text-16'>${email.split('@')[0]}</span>
      <div class='flex-center gap-12'>
        <button id='like' aria-label='좋아요' class='${`flex-center gap-3 ${likeIcon.color}`} '>
          <i class='${`block ${likeIcon.type} ph-heart text-22`}'></i>
          <span class='text-16'>${likes.length}</span>
        </button>
        <button id='share' aria-label='공유하기'>
          <i class='block ph ph-share-network text-22'></i>
        </button>
        ${
          isMine
            ? `<button id='more' aria-label='더보기' class='-mr-6'>
                <i class='block ph ph-dots-three-vertical text-22'></i>
              </button>
              `
            : ``
        }
      </div>
    `;
  }

  setEvent() {
    const { id: docId, likes, isMine } = this.props;
    const { user, isLoggedIn } = store.state;
    
    this.addEvent('click', '#like', () => {
      if (!isLoggedIn) {
        new Snackbar({ message: '로그인이 필요해요.' });
        return;
      }
      if (isMine) {
        new Snackbar({
          message: '나의 맛집 목록에는 "좋아요"를 할 수 없어요.',
        });
        return;
      }
      toggleLikeList(user.uid, docId, likes);
    });

    this.addEvent('click', '#share', sharePage);
  }
}
