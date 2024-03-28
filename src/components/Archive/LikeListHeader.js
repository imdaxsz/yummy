import Component from '@components';

export default class LikeListHeader extends Component {
  template() {
    const { count } = this.props;
    return `
      <div class='flex items-center justify-between pt-16 pb-30 text-13 gap-24'>
        <p class='text-zinc-400'>
          ${count}개의 항목이 있어요!
        </p>
        <button aria-label='전체삭제' class='text-zinc-500 shrink-0'>
          전체삭제
        </button>
      </div>
    `;
  }
}
