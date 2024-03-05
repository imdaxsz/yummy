import Header from '@components/Header';
import AbstractView from './AbstractView';
import Card from '@components/Card';

export default class ListInfo extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 목록 | yummy');
  }

  template() {
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 pb-90'>
        <h1 class='text-22 font-semibold mb-24 tracking-tight'>
          저만 알고 싶지만 공유합니다
        </h1>
        <div id='action' class='flex justify-between items-center text-zinc-500'>
          <span class='text-16'>manggom</span>
          <div class='flex-center gap-12'>
            <button aria-label='좋아요' id='like' class='flex-center text-secondary gap-2'>
              <i class='block ph-fill ph-heart text-22'></i>
              <span class='text-16'>4</span>
            </button>
            <button id='share' aria-label='공유하기'>
              <i class='block ph ph-upload-simple text-22'></i>
            </button>
            <button id='more' aria-label='더보기' class='-mr-8'>
              <i class='block ph ph-dots-three-vertical text-22'></i>
            </button>
          </div>
        </div>
        <p class='pt-40 pb-14 text-end text-13 text-zinc-400'>4곳의 맛집이 있어요!</p>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
    `;
  }

  // TODO
  // 내 리스트인 경우에만 더보기 버튼(리스트 이름 수정, 전체 삭제) 렌더링
  // 좋아요 여부에 따른 하트 아이콘 렌더링

  didMount() {
    const $header = this.$target.querySelector('#header');
    const $list = this.$target.querySelector('#list');
    new Header($header, { left: 'prev', center: '', right: 'menu' });

    [1, 2,3,4].forEach((i) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        cardType: 'place',
        id: i,
        title: '애옹카페',
        userId: 'bbangddeock',
        rating: 5,
        placeLocation: '동성로',
        thumnail: 'https://i.ibb.co/Xs9dyX8/Kakao-Talk-20240204-210852878.jpg',
      });
    });
  }
}
