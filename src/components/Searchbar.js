import Component from '@components';

export default class Searchbar extends Component {
  template() {
    return `
      <div class='relative'>
        <input class='w-full h-40 px-12 py-8 border rounded-xl' placeholder='검색' />
        <i class="ph ph-magnifying-glass text-23 absolute
        bottom-1/2 translate-y-1/2 right-12 text-zinc-400"></i>
      </div>
    `;
  }
}
