import Component from '@components';

export default class ListAction extends Component {
  template() {
    const { email, likes, isLiked, isMine } = this.props;
    const likeIcon = {
      type: isLiked ? 'ph-fill' : 'ph',
      color: isLiked ? 'text-secondary' : 'text-zinc-500',
    };

    return `
      <span class='text-16'>${email.split('@')[0]}</span>
      <div class='flex-center gap-12'>
        <button aria-label='좋아요' id='like' class='${`flex-center gap-3 ${likeIcon.color}`} '>
          <i class='${`block ${likeIcon.type} ph-heart text-22`}'></i>
          <span class='text-16'>${likes.length}</span>
        </button>
        <button id='share' aria-label='공유하기'>
          <i class='block ph ph-share-network text-22'></i>
        </button>
        ${
          isMine
            ? `<button id='more' aria-label='더보기' class='-mr-6'>
                <i class='block ph ph-dots-three-vertical text-22'></i>
              </button>
              `
            : ``
        }
      </div>
    `;
  }
}
