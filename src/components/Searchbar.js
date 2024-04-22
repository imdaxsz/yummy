import Component from '@components';

export default class Searchbar extends Component {
  constructor(
    $target,
    {
      autoFocus,
      placeholder,
      value = '',
      onClick,
      onChange = null,
      onSearch = null,
    },
  ) {
    super($target, {
      autoFocus,
      placeholder,
      value,
      onClick,
      onChange,
      onSearch,
    });
  }

  template() {
    const { autoFocus, placeholder, value } = this.props;
    const focus = autoFocus ? 'auto-focus' : '';

    return `
      <div id='container'>
        <form id='search' class='relative'>
          <input
            class='${`w-full h-40 px-12 py-8 border rounded-xl ${focus}`}' 
            placeholder='${placeholder}'
            value='${value}' 
          />
          <button 
            aria-label='검색하기' 
            type='submit' 
            class='absolute bottom-1/2 translate-y-1/2 right-12'
          >
            <i class='block ph ph-magnifying-glass text-23 text-zinc-400'></i>
          </button>
        </form>
      </div>
    `;
  }

  setEvent() {
    const input = this.$target.querySelector('input');
    const { onClick, onChange, onSearch } = this.props;
    if (onClick) this.addEvent('click', '#container', onClick);

    if (!onChange) return;
    this.addEvent('change', 'input', (e) => {
      onChange(e.target.value);
    });

    if (!onSearch) return;
    this.addEvent('submit', '#search', (e) => {
      e.preventDefault();
      if (input.value.trim().length === 0) {
        alert('검색어를 입력하세요!');
        return;
      }
      onSearch();
    });
  }

  didMount() {
    const { value } = this.props;
    if (!value) return;
    const input = this.$target.querySelector('input');
    const inputValue = input.value;
    input.focus();
    // cursor 위치를 마지막으로 하게 하기 위함
    input.value = '';
    input.value = inputValue;
  }
}
