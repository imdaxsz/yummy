import Header from '@components/Header';
import Card from '@components/Card';
import store from '@stores';
import Empty from '@components/Empty';
import isEndWithConsonant from '@utils/isEndWithConsonant';
import { getLikeItems } from '@apis/likes';
import Loader from '@components/Loader';
import AbstractView from './AbstractView';

export default class LikeList extends AbstractView {
  constructor($target, props) {
    super($target, props, '좋아요 | yummy');
  }

  setup() {
    this.state = {
      items: null,
    };
  }

  template() {
    const { items } = this.state;

    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 pb-90'>
        ${
          items && items.length > 0
            ? `<p class='pt-16 pb-30 text-13 text-zinc-400 text-end'>
                ${items.length}개의 항목이 있어요!
              </p>
              <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>`
            : ``
        }
        ${
          items && items.length === 0
            ? `<div id='empty' class='flex-center h-[80dvh]'></div>`
            : ``
        }
      </div>
    `;
  }

  async didMount() {
    const $header = this.$target.querySelector('#header');
    const searchParam = new URLSearchParams(window.location.href);
    const filter = searchParam.get('filter');
    const label = filter === 'list' ? '리스트' : '맛집';

    new Header($header, {
      left: 'prev',
      center: label,
      right: 'menu',
      to: '/archive?category=likes',
    });

    const { items } = this.state;

    if (!items) {
      await this.fetchLikeItems(filter);
      return;
    }

    const { user } = store.state;

    if (items.length === 0) {
      const $empty = this.$target.querySelector('#empty');
      new Empty($empty, {
        message: `'좋아요'한 ${label}${isEndWithConsonant(label) ? '이' : '가'} 없어요.`,
      });
      return;
    }

    const $list = this.$target.querySelector('#list');
    items.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      const commonProps = { id: item.id, userId: item.email.split('@')[0] };
      const props =
        filter === 'list'
          ? {
              ...commonProps,
              title: item.title,
              isLiked: item.likes.includes(user.uid),
              likeCount: item.likeCount,
              thumbnail: item.thumbnail,
            }
          : {
              ...commonProps,
              cardType: 'place',
              title: item.name,
              isLiked: item.likes.includes(user.uid),
              rating: item.ratingValue,
              placeLocation: item.locationInfo.address,
              thumbnail: item.attachments.length > 0 ? item.attachments[0] : '',
            };
      new Card(el, props);
    });
  }

  async fetchLikeItems(filter) {
    const loader = new Loader({});
    await getLikeItems(
      filter,
      (items) => {
        const page = window.location.pathname.split('/')[1];
        if (page !== 'archive') return;
        this.setState({ ...this.state, items });
      },
      true,
    );
    loader.unmount();
  }
}
