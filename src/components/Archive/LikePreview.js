import Component from '@components';
import Card from '@components/Card';
import Empty from '@components/Empty';
import store from '@stores';
import isEndWithConsonant from '@utils/isEndWithConsonant';
import navigate from '@utils/navigate';

// 북마크 한 목록 2개만
export default class LikesPreview extends Component {
  template() {
    const { type, items } = this.props;
    const label = type === 'list' ? '리스트' : '맛집';
    const empty = items.length === 0;
    return `
      <div class='flex items-center justify-between pt-24 pb-16'>
        <h3 class='font-semibold text-18 text-zinc-700'>${label}</h3>
        ${
          !empty
            ? `
              <a class='more' aria-label='더보기' href='/archive?category=likes&filter=${type}'>
                <i class='block ph ph-caret-right text-24 text-gray-400'></i>
              </a>`
            : ``
        }
      </div>
      ${
        empty
          ? `<div id='empty' class='py-16'></div>`
          : `<div id='list' class='grid grid-cols-2 gap-16 gap-y-24'></div>`
      }
      
    `;
  }

  didMount() {
    const { type, items } = this.props;

    if (items.length > 0) {
      const $list = this.$target.querySelector('#list');

      items.forEach((item) => {
        const el = document.createElement('div');
        $list.appendChild(el);
        const commonProps = { id: item.id, userId: item.email.split('@')[0] };
        const { user, isLoggedIn } = store.state;
        const isLiked = isLoggedIn ? item.likes.includes(user.uid) : false;
        const props =
          type === 'list'
            ? {
                ...commonProps,
                title: item.title,
                isLiked,
                likeCount: item.likeCount,
                thumbnail: item.thumbnail,
              }
            : {
                ...commonProps,
                cardType: 'place',
                isLiked,
                title: item.name,
                rating: item.ratingValue,
                placeLocation: item.locationInfo.address,
                thumbnail:
                  item.attachments.length > 0 ? item.attachments[0] : '',
              };
        new Card(el, props);
      });
      return;
    }

    const label = type === 'list' ? '리스트' : '맛집';
    const $empty = this.$target.querySelector('#empty');
    new Empty($empty, {
      message: `'좋아요'한 ${label}${isEndWithConsonant(label) ? '이' : '가'} 없어요.`,
    });
  }

  setEvent() {
    this.addEvent('click', '.more', (e) => {
      e.preventDefault();
      const target = e.target.parentNode;
      navigate(target.href);
    });
  }
}
