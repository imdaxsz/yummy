import Component from '@components';

export default class Searchbar extends Component {
  template() {
    const { autoFocus, placeholder } = this.props;
    const focus = autoFocus ? 'auto-focus' : '';
    return `
      <div id='container' class='relative'>
        <input
          class='${`w-full h-40 px-12 py-8 border rounded-xl ${focus}`}' 
          placeholder='${placeholder}' 
        />
        <i class="ph ph-magnifying-glass text-23 absolute
          bottom-1/2 translate-y-1/2 right-12 text-zinc-400"></i>
      </div>
    `;
  }

  setEvent() {
    const { onClick } = this.props;
    if (onClick) this.addEvent('click', '#container', onClick);
  }
}
