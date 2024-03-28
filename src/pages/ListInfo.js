import Header from '@components/Header';
import Card from '@components/Card';
import { getListInfo, getListItems } from '@utils/list';
import store from '@stores';
import ListAction from '@components/List/ListAction';
import AbstractView from './AbstractView';

export default class ListInfo extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 목록 | yummy');
  }

  setup() {
    this.state = {
      items: [],
      info: { title: '', email: '', likes: [], createdAt: '' },
      isLiked: false,
    };
  }

  template() {
    const {
      items,
      info: { title },
    } = this.state;

    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 pb-90'>
        <h1 class='text-22 font-semibold mb-16 tracking-tight'>
          ${title}
        </h1>
        <div id='action' class='flex justify-between items-center text-zinc-500'></div>
        <p class='pt-40 pb-14 text-end text-13 text-zinc-400'>${items.length}곳의 맛집이 있어요!</p>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
    `;
  }

  async didMount() {
    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '', right: 'menu' });

    const {
      items,
      info: { email, likes, createdAt },
      isLiked,
    } = this.state;
    const uid = window.location.pathname.split('/')[2];

    if (!createdAt) {
      await this.fetchListInfo(uid);
      await this.fetchData(uid);
      return;
    }

    const $action = this.$target.querySelector('#action');
    const isMine = store.state.user ? uid === store.state.user.uid : false;
    new ListAction($action, { email, likes, isLiked, isMine });

    const $list = this.$target.querySelector('#list');
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
        thumnail: item.attachments.length > 0 ? item.attachments[0] : '',
      });
    });
  }

  async fetchListInfo(uid) {
    const result = await getListInfo(uid);
    this.setState({ ...this.state, info: { ...result.data() } });
    if (store.state.user) {
      const {
        info: { likes },
      } = this.state;
      this.setState({
        ...this.state,
        isLiked: likes.includes(store.state.user.uid),
      });
    }
  }

  async fetchData(uid) {
    const result = await getListItems(uid);
    const temp = [];
    result.forEach((item) => {
      temp.push({ id: item.id, ...item.data() });
    });
    this.setState({ ...this.state, items: temp });
  }
}
