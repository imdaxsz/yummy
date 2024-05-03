import Component from '@components';
import { FOOD_CATEGORY } from '@constants';
import Chip from './Chip';

export default class Filtered extends Component {
  template() {
    return `</>`;
  }

  didMount() {
    const filtered = this.$target;
    const { categories, minScore, maxScore, onCategoryClick, onRatingClick } =
      this.props;

    categories.forEach((key) => {
      const ct = FOOD_CATEGORY.find((obj) => obj.id === key);
      const el = document.createElement('div');
      filtered.appendChild(el);

      new Chip(el, {
        id: key,
        text: ct.text,
        type: 'filtered',
        onClick: onCategoryClick,
      });
    });

    if (maxScore === 5 && minScore === 0) return;
    const getLabel = (score) => {
      if (score === 0) return '방문 전';
      return `<i class='ph-fill ph-star mr-2'></i>${score}`;
    };

    const el = document.createElement('div');
    const text =
      minScore === maxScore
        ? getLabel(minScore)
        : `${getLabel(minScore)} ~ ${getLabel(maxScore)}`;
    filtered.appendChild(el);

    new Chip(el, {
      id: 'score',
      text,
      type: 'filtered',
      onClick: onRatingClick,
    });
  }
}
