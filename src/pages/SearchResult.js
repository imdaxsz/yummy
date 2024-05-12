import search from '@apis/search';
import Card from '@components/Card';
import Empty from '@components/Empty';
import Filtered from '@components/Filtered';
import Loader from '@components/Loader';
import SearchModal from '@components/SearchModal';
import Searchbar from '@components/Searchbar';
import navigate from '@utils/navigate';
import toggleSearchModal from '@utils/toggleSearchModal';
import store from '@stores';
import AbstractView from './AbstractView';

export default class SearchResult extends AbstractView {
  constructor($target, props) {
    super($target, props, '검색 결과 | Yummy');
  }

  setup() {
    const searchParams = new URLSearchParams(window.location.search);
    const keyword = searchParams.get('keyword') ?? '';
    const categories = searchParams.getAll('categories');
    const minScore = Number(searchParams.get('min_score')) ?? 0;
    const maxScore = Number(searchParams.get('max_score')) ?? 5;

    this.state = {
      filter: { categories, minScore, maxScore, keyword },
      list: null,
      posts: null,
    };
  }

  template() {
    const { list, posts } = this.state;
    const completed = posts && list;

    return `
      <div id='search-header'
        class='bg-white flex items-center max-w-screen-sm
          w-full h-60 fixed gap-8 top-0 z-30 px-[1rem]'
      >
        <button aria-label='뒤로가기' class='back -ml-2 flex-center'>
          <i class='ph ph-caret-left text-24 block'></i>
        </button>
        <div id='searchbar' class='w-full'></div>
      </div>
      <div id='filtered' class='px-16 flex gap-7 mb-8 flex-wrap'></div>
      <div class='px-16 pb-90'>
      ${
        completed && Boolean(list.length || posts.length)
          ? `
            <p class='text-zinc-400 text-end py-16 text-13'>
              ${list.length + posts.length}개의 검색 결과가 있어요!
            </p>
            <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
            `
          : ``
      }
      ${completed && !(list.length || posts.length) ? `<div id='empty' class='h-[75dvh] flex-center'></div>` : ``}
      </div>
      <div id='search-modal' class='absolute top-0 z-30 w-full bg-white hidden touch-pan-x'></div>
    `;
  }

  async didMount() {
    const $searchbar = this.$target.querySelector('#searchbar');
    const $searchModal = this.$target.querySelector('#search-modal');

    const {
      filter: { categories, minScore, maxScore, keyword },
      posts,
      list,
    } = this.state;

    new Searchbar($searchbar, {
      placeholder: '검색어를 입력하세요.',
      onClick: () => toggleSearchModal($searchModal),
      autoFocus: false,
      value: keyword ?? '',
    });

    const filtered = this.$target.querySelector('#filtered');
    new Filtered(filtered, {
      categories,
      minScore,
      maxScore,
      onRatingClick: this.onRatingClick.bind(this),
      onCategoryClick: this.onCategoryClick.bind(this),
    });

    new SearchModal($searchModal, {
      filtered: { categories, minScore, maxScore, keyword },
      onClick: () => toggleSearchModal($searchModal),
    });

    if (!posts) {
      const loader = new Loader({});
      const res = await search(categories, minScore, maxScore, keyword);
      this.setState({ ...this.state, list: res.list, posts: res.posts });
      loader.unmount();
      return;
    }

    const $list = this.$target.querySelector('#list');

    list.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        id: item.id,
        title: item.title,
        userId: item.email.split('@')[0],
        likeCount: item.likeCount,
        isLiked: item.likes.includes(store.state.user.uid),
        thumbnail: item.thumbnail,
      });
    });

    posts.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        cardType: 'place',
        id: item.objectID,
        title: item.name,
        userId: item.email.split('@')[0],
        rating: item.ratingValue,
        placeLocation: item.locationInfo.address,
        thumbnail: item.attachments.length > 0 ? item.attachments[0] : '',
      });
    });

    if (posts.length || list.length) return;

    const $empty = this.$target.querySelector('#empty');
    new Empty($empty, {
      message: '검색 결과가 없어요.',
    });
  }

  setEvent() {
    this.addEvent('click', '.back', () => {
      window.history.back();
    });
  }

  onRatingClick() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('min_score', 0);
    searchParams.set('max_score', 5);
    this.setUrl(searchParams);
  }

  onCategoryClick(id) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('categories', id);
    this.setUrl(searchParams);
  }

  setUrl(params) {
    const url = `${window.location.pathname}?${decodeURIComponent(params.toString())}`;
    navigate(url);
  }
}
