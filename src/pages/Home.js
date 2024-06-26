import Searchbar from '@components/Searchbar';
import Header from '@components/Header';
import SearchModal from '@components/SearchModal';
import Card from '@components/Card';
import { getAllList } from '@apis/list';
import store from '@stores';
import Loader from '@components/Loader';
import toggleSearchModal from '@utils/toggleSearchModal';
import AbstractView from './AbstractView';
import Logo from '../../public/logo.png';

export default class Home extends AbstractView {
  constructor($target, props) {
    super($target, props, '홈 | Yummy');
  }

  setup() {
    this.state = { list: null, sort: 'updatedAt' };
  }

  template() {
    const { sort } = this.state;
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div id='content' class='px-16 ct-pb'>
        <div id='searchbar' class='pt-12'></div>
        <button id='sort' aria-label='정렬하기' class='py-24 block ml-auto'>
          <p class='text-14 flex items-center text-zinc-500'>
            <i class='ph ph-arrows-down-up mr-4 text-16 block'></i>
            ${sort === 'updatedAt' ? '업데이트순' : '좋아요순'}
          </p>
        </button>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
      <div id='search-modal' class='absolute top-0 z-30 w-full bg-white hidden touch-pan-x'></div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#sort', () => {
      const { sort: prev } = this.state;
      const sort = prev === 'updatedAt' ? 'likeCount' : 'updatedAt';
      this.setState({ ...this.state, list: null, sort });
    });
  }

  async didMount() {
    const $header = this.$target.querySelector('#header');
    const $searchbar = this.$target.querySelector('#searchbar');
    const $searchModal = this.$target.querySelector('#search-modal');

    new Header($header, {
      left: '',
      center: `<a href="/" aria-label="홈"><img id='logo' src='' alt='logo' class='w-40 h-40'/></a>`,
      right: 'menu',
    });

    const logoImg = this.$target.querySelector('#logo');
    logoImg.src = Logo;

    new Searchbar($searchbar, {
      placeholder: '검색',
      onClick: () => toggleSearchModal($searchModal),
      autoFocus: false,
    });
    new SearchModal($searchModal, {
      onClick: () => toggleSearchModal($searchModal),
    });

    const { list } = this.state;
    if (!list) {
      await this.fetchData();
      return;
    }

    const $list = this.$target.querySelector('#list');
    list.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      const { user, isLoggedIn } = store.state;
      const isLiked = isLoggedIn ? item.likes.includes(user.uid) : false;

      new Card(el, {
        id: item.id,
        title: item.title,
        userId: item.email.split('@')[0],
        likeCount: item.likeCount,
        isLiked,
        thumbnail: item.thumbnail,
      });
    });
  }

  async fetchData() {
    const { sort } = this.state;
    const loader = new Loader({});
    const res = await getAllList(sort);
    const list = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    this.setState({ ...this.state, list });
    loader.unmount();
  }
}

