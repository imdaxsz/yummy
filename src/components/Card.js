import Component from '@components';
import navigate from '@utils/Navigate';

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
    super($target, { cardType, likeCount, rating, placeLocation, isMine, ...rest });
  }

  template() {
    const {
      id,
      title,
      userId,
      likeCount,
      rating,
      placeLocation,
      isMine,
      thumnail,
      cardType,
    } = this.props;
    const isListCard = cardType === 'list';
    const url = isListCard ? `/list/${id}` : `/post/${id}`;
    const value = isListCard ? likeCount : rating;
    const icon = isListCard ? 'ph-heart' : 'ph-star';
    const iconColor = isListCard ? 'text-secondary' : 'text-primary';
    const isLiked = !isMine && location.pathname === '/archive';

    return `
      <a class='block relative' href=${url}>
      ${
        isLiked
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
          thumnail !== ''
            ? `<img
            src=${thumnail}
            alt='${userId}님의 리스트'
            class='w-full h-full object-cover bg-zinc-200' 
          />`
            : `<i class='ph ph-fork-knife text-[2.5rem] text-white'></i>`
        }
        </div>
        <h3 class='mt-4 mb-2 font-medium truncate tracking-tight'>${title}</h3>
        <div class='flex justify-between items-center text-14  w-full'>
          <span class='text-zinc-400 shrink-0'>${isListCard ? userId : placeLocation}</span>
          <div class='flex items-center justify-end gap-4 w-[70%]'>
            <span class='${`flex-center shrink-0 ${iconColor} gap-2`}'>
              <i class='${`block ph-fill ${icon} text-16`}'></i>
              ${value}
            </span>
            ${
              !isListCard && isLiked
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
      if (e.target.nodeName === 'BUTTON') return;
      if (!e.currentTarget.childNodes) return;
      const target = e.currentTarget.childNodes[1];
      navigate(target.href);
    });

    this.addEvent('click', 'button', (e) => {
      console.log('like button clicked');
    });
  }
}
