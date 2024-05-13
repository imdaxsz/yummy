import Component from '@components';
import Snackbar from '@components/Snackbar';
import store from '@stores';
import { toggleLikePost } from '@apis/likes';
import sharePage from '@utils/sharePage';

export default class PostAction extends Component {
  template() {
    const { likes, isLiked } = this.props;
    const icon = isLiked ? 'ph-fill' : 'ph';

    return `
      <button 
        id='like' 
        aria-label='좋아요' 
        class='flex-center gap-4 p-10 border rounded-lg'
      >
        <i class='${`block ${icon} ph-heart text-secondary`}'></i>
        <span class='text-14'>${likes.length}</span>
      </button>
      <button 
        id='share' 
        aria-label='공유하기' 
        class='p-10 border rounded-lg'
      >
        <i class="block ph ph-share-network"></i>
      </button>
    `;
  }

  setEvent() {
    const { id: docId, isLiked, isMine } = this.props;
    const { user, isLoggedIn } = store.state;

    this.addEvent('click', '#like', () => {
      if (!isLoggedIn) {
        new Snackbar({ message: '로그인이 필요해요.' });
        return;
      }
      if (isMine) {
        new Snackbar({
          message: '나의 맛집 포스트에는 "좋아요"를 할 수 없어요.',
        });
        return;
      }
      toggleLikePost(user.uid, docId, isLiked);
    });

    this.addEvent('click', '#share', sharePage);
  }
}
