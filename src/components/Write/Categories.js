import Component from '@components';
import { FOOD_CATEGORY } from '@constants';
import Chip from '../Chip';

export default class Categories extends Component {
  template() {
    return `
    `;
  }

  didMount() {
    const { categories, onClick } = this.props;

    FOOD_CATEGORY.forEach((item) => {
      const el = document.createElement('div');
      this.$target.appendChild(el);
      new Chip(el, {
        ...item,
        onClick,
        active: categories.includes(item.id),
      });
    });
  }
}
