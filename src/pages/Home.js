import Searchbar from '@components/Searchbar';
import Header from '@components/Header';
import SearchModal from '@components/SearchModal';
import AbstractView from './AbstractView';
import Card from '@components/Card';
// import Modal from '@components/Modal';

export default class Home extends AbstractView {
  $searchModal;

  $content;

  constructor($target, props) {
    super($target, props, '홈 | yummy');
    this.$searchModal = this.$target.querySelector('#search-modal');
    this.$content = this.$target.querySelector('#content');
  }

  template() {
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div id='content' class='px-16 pb-90'>
        <div id='searchbar'></div>
        <button id='sort' aria-label='정렬하기' class='py-24 block ml-auto'>
          <p class='text-14 flex items-center text-zinc-500'>
            <i class='ph ph-arrows-down-up mr-4 text-16 block'></i>
            업데이트순
          </p>
        </button>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
      <div id='search-modal' class='absolute top-0 z-30 w-full bg-white hidden'></div>
    `;
  }

  // setEvent() {
  //   this.addEvent('click', '#test', () => {
  //     new Modal({message: '하하하하', backdrop: false});
  //   })
  // }

  openSearchModal() {
    const display = this.$searchModal.style.display;
    if (display !== 'block') {
      this.$searchModal.style.display = 'block';
      this.$content.style.display = 'none';
      const input = this.$target.querySelector('input.auto-focus');
      if (input) input.focus();
    }
  }

  closeSearchModal() {
    const display = this.$searchModal.style.display;
    if (display === 'block') {
      this.$searchModal.style.display = 'none';
      this.$content.style.display = 'block';
    }
  }

  didMount() {
    const $header = this.$target.querySelector('#header');
    const $searchbar = this.$target.querySelector('#searchbar');
    const $list = this.$target.querySelector('#list');
    this.$searchModal = this.$target.querySelector('#search-modal');

    new Header($header, { left: '', center: 'yummy', right: 'menu' });
    new Searchbar($searchbar, {
      placeholder: '검색',
      onClick: this.openSearchModal.bind(this),
      autoFocus: false,
    });
    new SearchModal(this.$searchModal, {
      onClick: this.closeSearchModal.bind(this),
    });
    
    [1, 2].forEach((i) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        id: i,
        title: '빵떠기의 맛집 리스트',
        userId: 'bbangddeock',
        likeCount: 120,
        thumnail: 'https://i.ibb.co/Xs9dyX8/Kakao-Talk-20240204-210852878.jpg',
      });
    });
  }
}
