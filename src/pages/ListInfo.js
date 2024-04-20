import Header from '@components/Header';
import Card from '@components/Card';
import { getListItems } from '@apis/list';
import ListHeader from '@components/List/ListHeader';
import Loader from '@components/Loader';
import AbstractView from './AbstractView';

export default class ListInfo extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 목록 | yummy');
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
        <div id='list-header'></div>
        <p class='pt-40 pb-14 text-end text-13 text-zinc-400'>
          ${items ? items.length : 0}곳의 맛집이 있어요!
        </p>
        <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
      </div>
    `;
  }

  async didMount() {
    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '', right: 'menu' });

    const id = window.location.pathname.split('/')[2];
    const { items } = this.state;

    if (!items) {
      await this.fetchData(id);
      return;
    }

    const $listHeader = this.$target.querySelector('#list-header');
    new ListHeader($listHeader, { id });

    const $list = this.$target.querySelector('#list');
    items.forEach((item) => {
      const el = document.createElement('div');
      $list.appendChild(el);
      new Card(el, {
        cardType: 'place',
        id: item.id,
        title: item.name,
        userId: item.email.split('@')[0],
        rating: item.ratingValue,
        placeLocation: item.locationInfo.address,
        thumbnail: item.attachments.length > 0 ? item.attachments[0] : '',
      });
    });
  }

  async fetchData(id) {
    const loader = new Loader({});
    const res = await getListItems(id);
    const items = res.docs.map((item) => ({ id: item.id, ...item.data() }));
    this.setState({ ...this.state, items });
    loader.unmount();
  }
}
