import Component from "@components";

export default class MyListHeader extends Component {
  template() {
    const { title, likes, count } = this.props;
    return `
      <div id='list-header' class='pb-24'>
        <div class='flex items-center gap-16 pt-28 pb-12'>
          <h1 class='text-18 w-fit font-medium tracking-tight leading-none'>
            ${title}
          </h1>
          <i class="block ph ph-pencil-simple-line text-18 pt-3 text-zinc-400"></i>
        </div>
        <div id='action' class='flex justify-between items-center text-zinc-500'>
          <div class='flex-center gap-24'>
            <div id='like' aria-label='좋아요' class='flex-center gap-2'>
              <i class='block ph ph-heart text-20'></i>
              <span class='text-14'>${likes.length}</span>
            </div>
            <button id='share' aria-label='공유하기'>
              <i class='block ph ph-upload-simple text-20'></i>
            </button>
          </div>
          <button aria-label='전체삭제' class='text-13'>전체삭제</button>
        </div>
      </div>
      <p class='text-zinc-400 text-end pt-16 pb-14 text-13'>
        ${count}곳의 맛집이 있어요!
      </p>
    `;
  }
}