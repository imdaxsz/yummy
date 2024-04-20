import Component from '@components';
import Snackbar from '@components/Snackbar';
import store from '@stores';
import { toggleLikeList } from '@apis/likes';
import sharePage from '@utils/share';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@libs/firebase';

export default class ListHeader extends Component {
  setup() {
    const { id } = this.props;
    this.state = {
      title: '',
      email: '',
      likes: [],
      createdAt: '',
      isLiked: false,
      isMine: store.state.user ? id === store.state.user.uid : false,
    };
  }

  template() {
    const { title, email, likes, isLiked, isMine } = this.state;
    const likeIcon = {
      type: isLiked ? 'ph-fill' : 'ph',
      color: isLiked ? 'text-secondary' : 'text-zinc-500',
    };

    return `
      <h1 class='text-22 font-semibold mb-16 tracking-tight'>
        ${title}
      </h1>
      <div class='flex justify-between items-center text-zinc-500'>
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
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#like', () => {
      const { id: docId } = this.props;
      const { user, isLoggedIn } = store.state;
      const { isMine, isLiked } = this.state;

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
      toggleLikeList(user.uid, docId, isLiked);
    });

    this.addEvent('click', '#share', sharePage);
  }

  async didMount() {
    const { createdAt } = this.state;
    const { id } = this.props;
    if (!createdAt) {
      await this.fetchListInfo(id);
    }
  }

  async fetchListInfo(id) {
    const docRef = doc(db, 'list', id);
    onSnapshot(docRef, (item) => {
      const page = window.location.pathname.split('/')[1];
      if (page !== 'list') return;

      this.setState({ ...this.state, ...item.data() });
      if (store.state.user) {
        const { likes } = this.state;
        this.setState({
          ...this.state,
          isLiked: likes.includes(store.state.user.uid),
        });
      }
      document.title = `${this.state.title} | yummy`;
    });
  }
}
