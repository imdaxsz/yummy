import Component from '@components';
import { FOOD_CATEGORY } from '@constants';
import RangeSlider from './RangeSlider';
import Searchbar from './Searchbar';
import Chip from './Chip';

export default class SearchModal extends Component {
  setup() {
    this.state = { filter: { categories: [], minScore: 0, maxScore: 5 } };
  }

  template() {
    return `
      <div id='search-header'
          class='bg-white flex items-center max-w-screen-sm
          w-full h-60 fixed gap-8 top-0 z-31 px-[1rem]'
      >
        <div>
          <button id='back' aria-label='뒤로가기' class='-ml-2 flex-center'>
            <i class='ph ph-caret-left text-24 block'></i>
          </button>
        </div>
        <div id='searchbar' class='w-full'></div>
      </div>
      <div id='filtered' class='px-16 pt-60 flex gap-7 mb-8 flex-wrap'></div>
      <div class='px-16 h-dvh'>
        <p class='text-14 font-semibold pt-16 pb-8'>카테고리</p>
        <div id='chips' class='flex gap-7 mb-8 flex-wrap'></div>
        <p class='text-14 font-semibold pt-16 pb-8'>별점</p>
        <div id='slider'></div>
        <div class='h-300'></div>
      </div>
    `;
  }

  didMount() {
    const {
      filter: { categories, minScore, maxScore },
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
    categories.forEach((key) => {
      const ct = FOOD_CATEGORY.find((obj) => obj.id === key);
      const el = document.createElement('div');
      filtered.appendChild(el);
      new Chip(el, {
        id: key,
        text: ct.text,
        type: 'filtered',
        onClick: this.onChipClick.bind(this),
      });
    });

    if (!(maxScore === 5 && minScore === 0)) {
      const getLabel = (score) => {
        if (score === 0) return '방문 전';
        return `<i class='ph-fill ph-star mr-2'></i>${score}`;
      }
      const el = document.createElement('div');
      filtered.appendChild(el);
      new Chip(el, {
        id: 'score',
        text: `${getLabel(minScore)} ~ ${getLabel(maxScore)}`,
        type: 'filtered',
        onClick: this.onChipClick.bind(this),
      });
    }
  }

  setEvent() {
    const { onClick } = this.props;
    if (onClick) this.addEvent('click', '#back', onClick);
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
}
