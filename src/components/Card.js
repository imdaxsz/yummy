import { toggleLikeList, toggleLikePost } from '@apis/likes';
import Component from '@components';
import store from '@stores';
import navigate from '@utils/navigate';

export default class Card extends Component {
  constructor(
    $target,
    {
      cardType = 'list',
      likeCount = 0,
      rating = -1,
      placeLocation = '',
      isMine = false,
      ...rest
    },
  ) {
    super($target, {
      cardType,
      likeCount,
      rating,
      placeLocation,
      isMine,
      ...rest,
    });
  }

  template() {
    const {
      id,
      title,
      userId,
      likeCount,
      rating,
      placeLocation,
      isLiked,
      thumbnail,
      cardType,
    } = this.props;
    const isListCard = cardType === 'list';
    const url = isListCard ? `/list/${id}` : `/post/${id}`;
    const icon = isListCard ? 'ph ph-heart' : 'ph-fill ph-star';
    let iconColor = isListCard ? 'text-zinc-400' : 'text-primary';
    let value = isListCard ? likeCount : rating;
    if (rating === 0) {
      iconColor = 'text-neutral-300';
      value = '방문 전';
    }

    const isLikeListPage = isLiked && window.location.search.split('filter')[1];
    const location = placeLocation.split(' ').slice(0, 2).join(' ');

    return `
      <a class='block relative' href=${url}>
      ${
        isLikeListPage
          ? `<button aria-label='좋아요' class='absolute top-0 right-0 p-2'>
              <i class='block ph-fill ph-heart text-28 text-secondary-100'></i>
            </button>`
          : ``
      }
        <div
          class='w-full flex-center aspect-[4/3] bg-primary-30
          rounded-lg overflow-hidden text-14'
        >
        ${
          thumbnail !== ''
            ? `<img
            src=${thumbnail}
            alt='${userId}님의 맛집'
            class='w-full h-full object-cover bg-zinc-200' 
          />`
            : `<i class='ph ph-fork-knife text-[2.5rem] text-white'></i>`
        }
        </div>
        <h3 class='mt-6 leading-tight text-15 font-medium truncate tracking-tight'>${title}</h3>
        <div class='flex justify-between items-center text-13  w-full'>
          <span class='text-zinc-400 shrink-0'>${isListCard ? userId : location}</span>
          <div class='flex items-center justify-end gap-4 w-[70%]'>
            <span class='${`flex-center shrink-0 ${iconColor} gap-2`}'>
              <i class='${`block ${icon} text-15`}'></i>
              ${value}
            </span>
            ${
              !isListCard && window.location.pathname.split("/")[1] !== 'list'
                ? `<p class='text-zinc-400 author truncate'>${userId}</p>`
                : ``
            }
          </div>
        </div>
      </a>
    `;
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const { nodeName, classList } = e.target;
      if (nodeName === 'I' && classList.contains('ph-heart')) return;
      if (nodeName === 'BUTTON') return;
      if (!e.currentTarget.childNodes) return;
      const target = e.currentTarget.childNodes[1];
      navigate(target.href);
    });

    this.addEvent('click', 'button', () => {
      const { id, cardType, isLiked } = this.props;
      const { user, isLoggedIn } = store.state;

      if (!isLoggedIn) {
        alert('로그인이 필요해요.');
        window.location.reload();
        return;
      }

      if (cardType !== 'list') {
        toggleLikePost(user.uid, id, isLiked);
        return;
      }
      toggleLikeList(user.uid, id, isLiked);
    });
  }
}
