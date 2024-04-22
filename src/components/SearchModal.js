import Component from '@components';
import { FOOD_CATEGORY } from '@constants';
import navigate from '@utils/navigate';
import RangeSlider from './RangeSlider';
import Searchbar from './Searchbar';
import Chip from './Chip';
import Filtered from './Filtered';

const initFilter = { categories: [], minScore: 0, maxScore: 5, keyword: '' };

export default class SearchModal extends Component {
  setup() {
    const { filtered } = this.props;
    this.state = { filter: filtered ?? initFilter };
  }

  template() {
    const {
      filter: { categories, minScore, maxScore },
    } = this.state;
    const hasFilter =
      categories.length > 0 || !(minScore === 0 && maxScore === 5);
    
    return `
      <div id='search-header'
          class='bg-white flex items-center max-w-screen-sm
          w-full h-60 fixed gap-8 top-0 z-31 px-[1rem]'
      >
        
        <button aria-label='뒤로가기' class='back -ml-2 flex-center'>
          <i class='ph ph-caret-left text-24 block'></i>
        </button>
        <div id='searchbar' class='w-full'></div>
      </div>
      <div id='filtered' class='px-16 pt-60 flex gap-7 mb-8 flex-wrap'></div>
      <div class='px-16 h-dvh'>
        <p class='text-14 font-semibold pt-16 pb-8'>카테고리</p>
        <div id='chips' class='flex gap-7 mb-8 flex-wrap'></div>
        <p class='text-14 font-semibold pt-16 pb-8'>별점</p>
        <div id='slider'></div>
        ${
          hasFilter
            ? `<div class='flex-center mt-60 gap-32'>
                <button
                  id='reset'
                  aria-label='초기화'
                  class='flex-center gap-8 text-zinc-400'
                >
                  <i class="ph ph-arrow-clockwise"></i>
                  초기화
                </button>
                <button
                  id='search-btn'
                  aria-label='적용하기'
                  class='block btn-primary bg-primary w-[50%] py-8
                    rounded-full font-bold text-white'
                >
                  적용하기
                </button>
              </div>`
            : ``
        }
      </div>
    `;
  }

  didMount() {
    const {
      filter: { categories, minScore, maxScore, keyword },
    } = this.state;

    const slider = this.$target.querySelector('#slider');
    const searchbar = this.$target.querySelector('#searchbar');

    new RangeSlider(slider, {
      onRangeChange: this.onRangeChange.bind(this),
      minVal: minScore,
      maxVal: maxScore,
    });
    new Searchbar(searchbar, {
      placeholder: '검색어를 입력하세요.',
      autoFocus: true,
      onChange: this.onKeywordChange.bind(this),
      value: keyword ?? '',
      onSearch: this.onSearch.bind(this),
    });

    const chips = this.$target.querySelector('#chips');
    FOOD_CATEGORY.forEach((item) => {
      const el = document.createElement('div');
      chips.appendChild(el);
      new Chip(el, {
        ...item,
        type: 'filter',
        onClick: this.onChipClick.bind(this),
        active: categories.includes(item.id),
      });
    });

    const filtered = this.$target.querySelector('#filtered');
    new Filtered(filtered, {
      categories,
      minScore,
      maxScore,
      onCategoryClick: this.onChipClick.bind(this),
      onRatingClick: () => {
        this.onRangeChange('minScore', 0);
        this.onRangeChange('maxScore', 5);
      },
    });
  }

  setEvent() {
    const { onClick } = this.props;
    if (onClick) this.addEvent('click', '.back', onClick);

    this.addEvent('click', '#reset', () => {
      this.setState({
        ...this.state,
        filter: initFilter,
      });
    });

    this.addEvent('click', '#search-btn', this.onSearch.bind(this));
  }

  onSearch() {
    const {
      filter: { categories, minScore, maxScore, keyword },
    } = this.state;
    const { onClick } = this.props;

    let url = '/search?';
    url += `min_score=${minScore}&max_score=${maxScore}`;

    if (categories.length > 0) {
      categories.forEach((ct) => {
        url += `&categories=${ct}`;
      });
    }

    if (keyword) url += `&keyword=${keyword}`;
    onClick();
    navigate(url);
  }

  onChipClick(id) {
    const {
      filter: { categories: prev },
    } = this.state;
    const categories = prev.includes(id)
      ? prev.filter((i) => i !== id)
      : [...prev, id];
    this.setState({
      ...this.state,
      filter: { ...this.state.filter, categories },
    });
  }

  onRangeChange(target, value) {
    this.setState({
      ...this.state,
      filter: { ...this.state.filter, [target]: value },
    });
  }

  onKeywordChange(text) {
    this.setState({
      ...this.state,
      filter: { ...this.state.filter, keyword: text },
    });
  }
}
