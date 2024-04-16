import Component from '@components';
import Card from '@components/Card';
import store from '@stores';

export default class MyList extends Component {
  template() {
    return `
      <div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>
    `;
  }

  didMount() {
    const $list = this.$target.querySelector('#list');
    const { items } = this.props;

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
        isLiked: item.likes.includes(store.state.user.uid),
        thumbnail: item.attachments.length > 0 ? item.attachments[0] : '',
      });
    });
  }
}
