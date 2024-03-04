import Component from '@components';
import navigate from '@utils/Navigate';

export default class Card extends Component {
  template() {
    const { id, title, userId, likes, thumnail } = this.props;

    return `
      <a href='${`/list/${id}`}'>
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
        <h3 class='mt-4 mb-2 font-medium'>${title}</h3>
        <div class='flex justify-between items-center text-14'>
          <span class='text-zinc-400'>${userId}</span>
          <span class='flex-center text-secondary gap-2'>
            <i class='ph-fill ph-heart'></i>
            ${likes}
            </span>
        </div>
      </a>
    `;
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      if (!e.currentTarget.childNodes) return;
      const target = e.currentTarget.childNodes[1];
      navigate(target.href);
    });
  }
}
