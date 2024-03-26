import Header from '@components/Header';
import Rating from '@components/Rating';
import Chip from '@components/Chip';
import { EVALUATION, EVALUATION_LABEL } from '@constants';
import ImageSlider from '@components/ImageSlider';
import MoreModal from '@components/MoreModal';
import AbstractView from './AbstractView';

export default class Post extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 | yummy');
  }

  setup() {
    this.state = {
      isMoreModalVisible: false,
      imageUrl: [
        'https://firebasestorage.googleapis.com/v0/b/yummy-b566a.appspot.com/o/vO2jHJnYJqf3ry73XLo2824EJ012%2FHlWpGlnym9vlJ5OTqjhK%2F6ae0393c-fda9-4cdf-aaf6-4eb6e5d08c8b?alt=media&token=ba9e36a3-da8a-4dbb-9e7d-bd1f4599b345',
        'https://firebasestorage.googleapis.com/v0/b/yummy-b566a.appspot.com/o/vO2jHJnYJqf3ry73XLo2824EJ012%2FHlWpGlnym9vlJ5OTqjhK%2F41973183-4d09-4de2-af4f-b9c9679ac55e?alt=media&token=57e1b98a-2266-4517-bbb8-05fcc7547db2',
      ],
    };
  }

  template() {
    const { imageUrl } = this.state;
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-18 pt-8 py-100 tracking-tight'>
        <div id='post-header' class='flex justify-between'>
          <div>
            <div class='flex gap-12 items-end'>
              <h3 class='text-20'>대쿠이</h3>
              <p class='text-14 pb-3 text-secondary font-semibold'>일식</p>
            </div>
              <div id='info' class='flex-center gap-6 text-14'>
                <p class='text-gray-500'>manggom</p>
                <span class='text-zinc-300 dot'>2024.02.07</span>
              </div>
          </div>
          <div>          
            <button id='more' aria-label='더보기' class='text-24 text-zinc-400 -mx-7'>
              <i class="block ph-bold ph-dots-three-vertical"></i>
            
          </div>
        </div>
        <div id='content' class='pt-40'>
          ${imageUrl.length > 0 ? `<div id='attachments'></div>` : ``}
          <div id='rating' class='p-8 my-16'></div>
          <div id='evaluation' class='mb-48 text-14 flex flex-wrap gap-7'></div>
          <div>
            <p class='text-secondary text-14 font-medium'>추천 메뉴</p>
            <span>모듬카츠</span>
          </div>
          <p class='mt-40'>정말 맛있었다...</p>
          <a href='${`https://map.kakao.com/link/map/12345`}'
            class='flex items-center gap-8 mt-80 border px-8 py-12 
                    rounded-lg shadow-sm border-zinc-200'
          >
            <i class='ph-fill ph-map-pin text-28 block text-primary'></i>
            <div class='flex-1 min-w-0'>
              <p class='font-medium truncate text-14 leading-tight'>대쿠이 본점</p>
              <p class='text-zinc-400 truncate text-12'>대구 남구 중앙대로51길 38-2 1층</p>
            </div>
          </a>
          <div id='action' class='flex-center gap-12 text-24 text-zinc-500 pt-70 pb-40'>
            <button aria-label='좋아요' class='flex-center gap-2 p-10 border rounded-lg'>
              <i class='block ph-fill ph-heart text-secondary'></i>
              <span class='text-14'>4</span>
            </button>
            <button aria-label='공유하기' class='p-10 border rounded-lg'>
              <i class="block ph ph-share-network"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#more', this.toggleMoreModal.bind(this));
  }

  didMount() {
    const $header = this.$target.querySelector('#header');
    const $rating = this.$target.querySelector('#rating');
    const $attachments = this.$target.querySelector('#attachments');
    const $evaluation = this.$target.querySelector('#evaluation');

    new Header($header, { left: 'prev', center: '', right: 'menu' });
    new Rating($rating, {
      value: 5,
      readonly: true,
    });

    if ($attachments)
      new ImageSlider($attachments, {
        imageUrl: this.state.imageUrl,
        readonly: true,
      });

    Object.entries(EVALUATION_LABEL).forEach(([key, value]) => {
      const el = document.createElement('div');
      $evaluation.appendChild(el);
      new Chip(el, {
        label: value,
        text: EVALUATION[key][2].text,
        type: 'explain',
      });
    });
  }

  toggleMoreModal() {
    const $modal = document.querySelector('#modal');
    if (!$modal) {
      new MoreModal({
        toggleMoreModal: this.toggleMoreModal.bind(this),
      });
      return;
    }
    $modal.remove();
  }
}
