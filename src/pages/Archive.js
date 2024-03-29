import Header from '@components/Header';
import Tabs from '@components/Tabs';
import navigate from '@utils/navigate';
import Card from '@components/Card';
import store from '@stores';
import { getListInfo, getListItems } from '@utils/list';
import LikeListHeader from '@components/Archive/LikeListHeader';
import MyListHeader from '@components/Archive/MyListHeader';
import AbstractView from './AbstractView';

export default class Archive extends AbstractView {
  constructor($target, props) {
    super($target, props, '보관함 | yummy');
  }

  setup() {
    this.state = {
      tabs: [
        { id: 'my', label: '나의 맛집' },
        { id: 'likes', label: '좋아요' },
      ],
      isMyList: window.location.search.split('=')[1] === 'my',
      items: [],
      info: { title: '', email: '', likes: [], createdAt: '' },
    };
  }

  template() {
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 pb-90'>
        <div id='tabs'></div>
        <div id='list-header'></div>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
    `;
  }

  async didMount() {
    if (!store.state.user) return;
    const {
      tabs,
      isMyList,
      items,
      info: { title, likes, createdAt },
    } = this.state;

    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '보관함', right: 'menu' });

    const $tabs = this.$target.querySelector('#tabs');
    new Tabs($tabs, {
      items: tabs,
      onClick: (currentId) => this.onTabClick(currentId),
    });

    const $listHeader = this.$target.querySelector('#list-header');

    if (isMyList) {
      if (!createdAt) {
        await this.fetchListInfo();
        return;
      }
      new MyListHeader($listHeader, { title, likes, count: items.length });
    } else new LikeListHeader($listHeader, { count: items.length });

    const $list = this.$target.querySelector('#list');

    if (items.length === 0) {
      await this.fetchData();
      return;
    }

    items.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        cardType: 'place',
        id: item.id,
        title: item.name,
        userId: item.username.split('@')[0],
        rating: item.ratingValue,
        placeLocation: item.locationInfo.address,
        isLiked: item.likes.includes(store.state.user.uid),
        thumbnail: item.attachments.length > 0 ? item.attachments[0] : '',
      });
    });
  }

  async fetchData() {
    const result = await getListItems(store.state.user.uid);
    const temp = [];
    result.forEach((item) => {
      temp.push({ id: item.id, ...item.data() });
    });
    this.setState({ ...this.state, items: temp });
  }

  async fetchListInfo() {
    const result = await getListInfo(store.state.user.uid);
    this.setState({ ...this.state, info: { ...result.data() } });
  }

  onTabClick(id) {
    navigate(`/archive?category=${id}`);
  }
}
