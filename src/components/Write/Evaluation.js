import Component from '@components';
import { EVALUATION } from '@constants';
import Chip from '../Chip';

export default class Evaluation extends Component {
  template() {
    return `
      <span>맛</span>
      <div id='taste'></div>
      <span>가격</span>
      <div id='price'></div>
      <span>서비스</span>
      <div id='service'></div>
      <span>위생</span>
      <div id='clean'></div>
      <span>매장</span>
      <div id='hall'></div>
      <span>웨이팅</span>
      <div id='waiting'></div>
    `;
  }

  didMount() {
    const { evaluation, onClick } = this.props;
    for (const key of Object.keys(EVALUATION)) {
      const container = this.$target.querySelector(`#${key}`);
      container.className = 'flex-center gap-8 pt-8 pb-24 text-zinc-500';
      EVALUATION[key].forEach((item) => {
        const el = document.createElement('div');
        new Chip(el, {
          type: 'select',
          id: `${key}-${item.score}`,
          text: item.text,
          active:
            evaluation.hasOwnProperty(key) && evaluation[key] === item.score,
          onClick,
        });
        container.appendChild(el);
      });
    }
  }
}
