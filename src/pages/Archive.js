import Header from '@components/Header';
import AbstractView from './AbstractView';
import Tabs from '@components/Tabs';
import navigate from '@utils/Navigate';
import Card from '@components/Card';

export default class Archive extends AbstractView {
  $listHeader;

  constructor($target, props) {
    super($target, props, '보관함 | yummy');
    this.$listHeader = this.$target.querySelector('#list-header');
  }

  setup() {
    this.state = {
      items: [
        { id: 'my', label: '나의 맛집' },
        { id: 'likes', label: '좋아요' },
      ],
    };
  }

  template() {
    const currentTab = window.location.search.split('=')[1];
    const isMyList = currentTab === 'my';
    const textAlign = isMyList ? 'text-end' : '';
    const pbottom = isMyList ? 'pb-14' : 'pb-30';

    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 pb-90'>
        <div id='tabs'></div>
        ${
          isMyList
            ? `<div id='list-header' class='pb-24'>
                <h1 class='text-18 font-medium pt-24 pb-8 tracking-tight'>
                  저만 알고 싶지만 공유합니다
                </h1>
                <div id='action' class='flex justify-between items-center text-zinc-500'>
                  <div class='flex-center gap-12'>
                    <div id='like' aria-label='좋아요' class='flex-center text-secondary gap-2'>
                      <i class='block ph-fill ph-heart text-20'></i>
                      <span class='text-14'>4</span>
                    </div>
                    <button id='share' aria-label='공유하기'>
                      <i class='block ph ph-upload-simple text-20'></i>
                    </button>
                  </div>
                  <button aria-label='전체삭제' class='text-13'>전체삭제</button>
                </div>
              </div>`
            : ``
        }

        <div class='${`flex items-center justify-between pt-16 ${pbottom} text-13 gap-24`}'>
          <p class='${`text-zinc-400 ${textAlign}`}'>
            4${isMyList ? '곳의 맛집' : '개의 항목'}이 있어요!
          </p>
          ${
            !isMyList
              ? `<button aria-label='전체삭제' class='text-zinc-500 shrink-0'>
                  전체삭제
                </button>`
              : ``
          }
        </div>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
    `;
  }

  onTabClick(id) {
    navigate(`/archive?category=${id}`);
  }

  didMount() {
    const { items } = this.state;
    const $header = this.$target.querySelector('#header');
    const $tabs = this.$target.querySelector('#tabs');
    const $list = this.$target.querySelector('#list');
    new Header($header, { left: 'prev', center: '보관함', right: 'menu' });
    new Tabs($tabs, {
      items,
      onClick: (currentId) => this.onTabClick(currentId),
    });

    [1, 2, 3, 4].forEach((i) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        cardType: 'place',
        id: i,
        title: '애옹카페',
        userId: 'bbangddeock',
        rating: 5,
        placeLocation: '동성로',
        isMine: true,
        thumnail: 'https://i.ibb.co/Xs9dyX8/Kakao-Talk-20240204-210852878.jpg',
      });
    });
  }
}
